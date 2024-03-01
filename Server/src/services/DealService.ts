import { AppDataSource } from "../data-source";
import { DealEntity } from "../entities/DealEntity";
import { Deal } from "../models/Deal";
import { Product } from "../models/Product";
import { DealCheckerResponse } from "../models/utils/DealCheckerResponse";
import { ProductService } from "./ProductService";

export class DealService {
  private dealRepo = AppDataSource.getRepository(DealEntity);
  private prodServ = new ProductService();

  async getDeals(): Promise<Array<Deal>> {
    const deals = await this.dealRepo.find({
      where: { soft_delete: false },
      relations: { product: true },
      order: { deal_id: "ASC" },
    });
    return deals;
  }

  async getDealsWithPagination(
    page: number,
    pageSize: number
  ): Promise<Array<Deal>> {
    const skip = (page - 1) * pageSize;
    const deals = await this.dealRepo.find({
      where: { soft_delete: false },
      relations: { product: true },
      skip: skip,
      take: pageSize,
      order: { deal_id: "ASC" },
    });
    return deals;
  }

  async getDealById(id: number): Promise<Deal | null> {
    return await this.dealRepo.findOneBy({
      deal_id: id,
      soft_delete: false,
    });
  }

  async getDealByProductId(id: number): Promise<Deal | null> {
    return await this.dealRepo.findOneBy({
      product_id: id,
      soft_delete: false,
    });
  }

  async checkProductHasDealById(id: number): Promise<DealCheckerResponse> {
    const deal = await this.getDealByProductId(id);
    const dealCheckerRes = {} as DealCheckerResponse;
    if (deal) {
      const now = new Date();
      console.log(now);
      console.log(deal.endAt);
      dealCheckerRes.hasDeal = true;
      dealCheckerRes.deal = deal;
      dealCheckerRes.timeRemaining = deal.endAt.getTime() - now.getTime();
    } else {
      dealCheckerRes.hasDeal = false;
      dealCheckerRes.deal = null;
      dealCheckerRes.timeRemaining = null;
    }
    return dealCheckerRes;
  }

  async countDeals(): Promise<number> {
    return await this.dealRepo.count({
      where: { soft_delete: false },
    });
  }

  async saveDeal(deal: Deal): Promise<Deal | null> {
    const prod = deal.product;
    deal.discountedPrice = this.calcNewPrice(deal.fullPrice, deal.discount);
    prod.price = deal.discountedPrice;
    const updatedProd = (await this.prodServ.updateProduct(prod)) as Product;
    deal.product = updatedProd;
    return await this.dealRepo.save(deal);
  }

  async softDeleteDeaById(id: number): Promise<Object> {
    const dealToRemove = await this.getDealById(id);
    if (dealToRemove) {
      const product = await this.prodServ.getProductById(
        dealToRemove.product_id
      );
      dealToRemove.soft_delete = true;
      if (product) {
        product.price = dealToRemove.fullPrice;
        await this.prodServ.updateProduct(product);
      } else throw new Error("Can't update product price, product not found!");
      await this.dealRepo.save(dealToRemove);
      return { status: "OK" };
    } else
      return {
        error: "Can't delete deal, deal not found!",
      };
  }

  async updateDeal(deal: Deal): Promise<Deal | null> {
    const prod = deal.product;
    deal.discountedPrice = this.calcNewPrice(prod.price, deal.discount);
    prod.price = deal.discountedPrice;
    const updatedProd = (await this.prodServ.updateProduct(prod)) as Product;
    deal.product = updatedProd;
    return await this.dealRepo.save(deal);
  }

  async restoreProductPrice(deal: Deal): Promise<Deal | null> {
    const prod = deal.product;
    prod.price = deal.fullPrice;
    const restoredProd = (await this.prodServ.updateProduct(prod)) as Product;
    deal.product = restoredProd;
    deal.soft_delete = true;
    return await this.dealRepo.save(deal);
  }

  private calcNewPrice(oldPrice: number, discount: number): number {
    return oldPrice - (oldPrice * discount) / 100;
  }
}
