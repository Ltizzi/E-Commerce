import { Between } from "typeorm";
import { AppDataSource } from "../data-source";
import { PurchaseEntity } from "../entities/PurchaseEntity";
import { StockEntity } from "../entities/StockEntity";
import { Product } from "../models/Product";
import { Purchase } from "../models/Purchase";
import { ShopOrder } from "../models/ShopOrder";
import { Stock } from "../models/Stock";
import { DealService } from "./DealService";
import { DealMapper } from "../dto/mappers/deal.mapper";
import { Deal } from "../models/Deal";

export class PurchaseService {
  private purchaseRepo = AppDataSource.getRepository(PurchaseEntity);
  // private userRepo = AppDataSource.getRepository(UserEntity);
  private stockRepo = AppDataSource.getRepository(StockEntity);
  // private stockService = new StockService();
  private dealServ = new DealService();
  private dealMapper = new DealMapper();

  async getPurchasesWithPagination(
    page: number,
    pageSize: number
  ): Promise<Array<PurchaseEntity>> {
    const skip = (page - 1) * pageSize;
    // return await this.purchaseRepo
    //   .createQueryBuilder("purchase")
    //   .where({ soft_delete: false })
    //   .orderBy("purchase.purchase_id", "ASC")
    //   .skip(skip)
    //   .take(pageSize)
    //   .getMany();
    return await this.purchaseRepo.find({
      where: { soft_delete: false },
      order: { purchase_id: "ASC" },
      relations: { orders: true, user: false },
      skip: skip,
      take: pageSize,
    });
  }

  async countPurchases(): Promise<number> {
    return await this.purchaseRepo.count({ where: { soft_delete: false } });
  }

  async getPurchaseById(id: number): Promise<PurchaseEntity | null> {
    return await this.purchaseRepo.findOneBy({
      purchase_id: id,
      soft_delete: false,
    });
  }

  async getPurchasesByUserId(user_id: number): Promise<Array<PurchaseEntity>> {
    // const user: UserEntity = (await this.userRepo.findOneBy({
    //   user_id: user_id,
    //   soft_delete: false,
    // })) as UserEntity;
    return await this.purchaseRepo.findBy({ user_id });
  }

  async countPurchasesByUserId(user_id: number): Promise<number> {
    return await this.purchaseRepo.count({
      where: { user_id: user_id },
    });
  }

  async getPurchasesByUserIdWithPagination(
    user_id: number,
    page: number,
    pageSize: number
  ): Promise<Array<Purchase>> {
    const skip = (page - 1) * pageSize;
    return await this.purchaseRepo.find({
      where: { user_id: user_id },
      order: { purchase_id: "ASC" },
      relations: { orders: true, user: false },
      skip: skip,
      take: pageSize,
    });
  }

  private calcIncome(purchases: Array<Purchase>): number {
    let income = 0;
    purchases.forEach((purch: Purchase) => {
      income += purch.total_income;
    });
    return income;
  }

  async getTotalIncome(): Promise<number> {
    const purchases = await this.purchaseRepo.find({
      where: { soft_delete: false },
      relations: { orders: false, user: false },
    });
    if (purchases) {
      return this.calcIncome(purchases);
    } else throw new Error("Something went wrong while calculating income");
  }

  async getYearIncome(): Promise<number> {
    const actualYear = new Date().getFullYear();
    const purchases = await this.purchaseRepo.find({
      where: {
        createdAt: Between(
          new Date(`${actualYear}-01-01T00:00:00Z`),
          new Date(`${actualYear}-12-31T23:59:59Z`)
        ),
        soft_delete: false,
      },
      relations: { orders: false, user: false },
    });
    if (purchases) {
      return this.calcIncome(purchases);
    } else throw new Error("Something went wrong while calculating income");
  }

  async getMonthlyIncome(): Promise<number> {
    const actualMonth = new Date().getMonth() + 1;
    const actualYear = new Date().getFullYear();
    const now = new Date();
    console.log("ACTUAL DATE: ", now);
    console.log("MONTH: ", actualMonth);
    console.log("YEAR: ", actualYear);
    console.log(
      `${actualYear}-${
        actualMonth > 9 ? actualMonth : "0" + actualMonth
      }-01T00:00:00Z`
    );
    const purchases = await this.purchaseRepo.find({
      where: {
        createdAt: Between(
          new Date(
            `${actualYear}-${
              actualMonth > 9 ? actualMonth : "0" + actualMonth
            }-01T00:00:00Z`
          ),
          now
        ),
        soft_delete: false,
      },
      relations: { orders: false, user: false },
    });
    if (purchases) {
      return this.calcIncome(purchases);
    } else throw new Error("Something went wrong while calculating income");
  }

  async getWeeklyIncome(): Promise<number> {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const purchases = await this.purchaseRepo.find({
      where: {
        createdAt: Between(sevenDaysAgo, now),
        soft_delete: false,
      },
      relations: { orders: false, user: false },
    });
    if (purchases) {
      return this.calcIncome(purchases);
    } else throw new Error("Something went wrong while calculating income");
  }

  async savePurchase(purchase: Purchase): Promise<PurchaseEntity | null> {
    const items: Array<ShopOrder> = purchase.orders;
    let totalIncome: number = 0;
    let stocksPromises: Promise<Stock | null>[] = [];

    for (const item of items) {
      const product: Product = item.product;
      try {
        const stock = (await this.stockRepo.findOneBy({
          product_id: product.product_id,
        })) as Stock;
        this.handleDeal(product.product_id, item.cantidad);
        if (stock) {
          totalIncome += item.total;
          stock.cantidad -= item.cantidad;
          stocksPromises.push(this.stockRepo.save(stock));
        } else throw new Error("stock not found");
      } catch (err: any) {
        throw new Error(err);
      }
    }

    await Promise.all(stocksPromises);
    purchase.total_income = totalIncome;
    return await this.purchaseRepo.save(purchase);
  }

  async deletePurchaseById(id: number): Promise<Object> {
    const purchase = (await this.purchaseRepo.findOneBy({
      purchase_id: id,
      soft_delete: false,
    })) as PurchaseEntity;
    if (purchase) {
      let items: Array<ShopOrder> = purchase.orders;
      let stocks: Array<Stock> = [];
      items.forEach(async (item) => {
        const product = item.product;
        const stock = (await this.stockRepo.findOneBy({
          product: product,
        })) as Stock;
        stock.cantidad -= item.cantidad;
        stocks.push(stock);
      });
      stocks.forEach(async (stock) => await this.stockRepo.save(stock));
      purchase.soft_delete = true;
      const deletedPurchase = await this.purchaseRepo.save(purchase);
      return { status: "OK" };
    } else return { error: "purchases not found!" };
  }

  async updatePurchase(purchase: Purchase): Promise<PurchaseEntity | null> {
    const oldPurchase = (await this.purchaseRepo.findOneBy({
      purchase_id: purchase.purchase_id,
    })) as Purchase;
    const oldItems = oldPurchase?.orders as Array<ShopOrder>;
    const items = purchase.orders as Array<ShopOrder>;
    let stocksPromises: Promise<Stock | null>[] = [];
    let total_income = 0;

    for (const item of items) {
      const oldItem = oldItems.filter(
        (old) => old.shop_order_id == item.shop_order_id
      );
      const product = item.product as Product;
      try {
        let stock = (await this.stockRepo.findOneBy({
          product_id: product.product_id,
        })) as Stock;
        total_income += item.total;
        this.handleDeal(product.product_id, item.cantidad);
        if (oldItem.length == 1) {
          stock.cantidad -= oldItem[0].cantidad;
        } else
          throw new Error(
            "update purchase failed: there is no posibility to be more than one"
          );
        stock.cantidad += item.cantidad;
        stocksPromises.push(this.stockRepo.save(stock));
      } catch (err: any) {}
    }
    await Promise.all(stocksPromises);
    purchase.total_income = total_income;
    purchase.createdAt = oldPurchase.createdAt;
    purchase.soft_delete = oldPurchase.soft_delete;
    return await this.purchaseRepo.save(purchase);
  }

  async handleDeal(id: number, cantidad: number) {
    const hasDeal = await this.dealServ.checkProductHasDealById(id);
    if (hasDeal.hasDeal) {
      const deal = hasDeal.deal as Deal;
      if (deal) {
        deal.units -= cantidad;
        await this.dealServ.updateDeal(deal);
      }
    }
  }
}
