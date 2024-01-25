import { AppDataSource } from "../data-source";
import { StockEntity } from "../entities/StockEntity";
import { Stock } from "../models/Stock";

export class StockService {
  private stockRepo = AppDataSource.getRepository(StockEntity);

  async getStocks(): Promise<Array<StockEntity>> {
    return await this.stockRepo
      .createQueryBuilder("stock")
      .where({ soft_delete: false })
      .orderBy("stock.stock_id", "ASC")
      .getMany();
  }

  async getStockWithPagination(
    page: number,
    pageSize: number
  ): Promise<Array<StockEntity>> {
    const skip = (page - 1) * pageSize;
    return await this.stockRepo
      .createQueryBuilder("stock")
      .where({ soft_delete: false })
      .orderBy("stock.stock_id", "ASC")
      .skip(skip)
      .take(pageSize)
      .getMany();
  }

  async countStocks(): Promise<number> {
    return await this.stockRepo.count();
  }

  async isThereStockForProduct(id: number): Promise<boolean> {
    const stock = await this.stockRepo.findOneBy({
      stock_id: id,
      soft_delete: false,
    });
    if (stock) return stock?.cantidad > 0;
    else return false;
  }

  async getStockById(id: number): Promise<StockEntity | null> {
    return await this.stockRepo.findOneBy({ stock_id: id, soft_delete: false });
  }

  async saveStock(stock: Stock): Promise<StockEntity | null> {
    return await this.stockRepo.save(stock);
  }

  async softDeleteStockById(id: number): Promise<Object> {
    const stockToRemove: StockEntity | null = await this.stockRepo.findOneBy({
      stock_id: id,
      soft_delete: false,
    });
    if (stockToRemove) {
      stockToRemove.soft_delete = true;
      await this.stockRepo.save(stockToRemove);
      return { status: "OK" };
    } else return { error: "Stock not found!" };
  }

  async updateStock(stock: Stock): Promise<StockEntity | null> {
    return await this.stockRepo.save(stock);
  }
}
