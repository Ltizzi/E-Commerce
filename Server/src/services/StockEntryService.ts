import { AppDataSource } from "../data-source";
import { StockEntity } from "../entities/StockEntity";
import { StockEntryEntity } from "../entities/StockEntryEntity";
import { Stock } from "../models/Stock";
import { StockEntry } from "../models/StockEntry";

export class StockEntryService {
  private entryRepo = AppDataSource.getRepository(StockEntryEntity);

  private stockRepo = AppDataSource.getRepository(StockEntity);

  async getAllEntries(): Promise<Array<StockEntryEntity>> {
    // return await this.entryRepo
    //   .createQueryBuilder("entry")
    //   .where({ soft_delete: false })
    //   .orderBy("entry.entry.id", "ASC")
    //   .getMany();
    const entries = await this.entryRepo.find({
      where: { soft_delete: false },
      order: { entry_id: "ASC" },
      relations: { stock: true, product: false },
    });
    console.log("FROM entry SERVICE: ");
    console.log(entries);
    return entries;
  }

  async getEntriesWithPagination(
    page: number,
    pageSize: number
  ): Promise<Array<StockEntryEntity>> {
    const skip = (page - 1) * pageSize;
    // return await this.entryRepo
    //   .createQueryBuilder("entry")
    //   .where({ soft_delete: false })
    //   .orderBy("entry.entry_id", "ASC")
    //   .skip(skip)
    //   .take(pageSize)
    //   .getMany();
    return await this.entryRepo.find({
      where: { soft_delete: false },
      order: { entry_id: "ASC" },
      skip: skip,
      take: pageSize,
    });
  }

  async countEntries(): Promise<number> {
    return await this.entryRepo.count({ where: { soft_delete: false } });
  }

  async getEntryById(id: number): Promise<StockEntryEntity | null> {
    return await this.entryRepo.findOneBy({ entry_id: id, soft_delete: false });
  }

  async saveEntry(entry: StockEntry): Promise<StockEntryEntity | null> {
    const stock = (await this.getStockById(entry.stock.stock_id)) as Stock;
    if (stock) {
      console.log("FROM entry SERVICE");
      console.log(stock);
      stock.cantidad = stock?.cantidad + entry.cantidad;
      // const entries: Array<StockEntry> = stock.entries;
      // entries.push(entry);
      // stock.entries = entries;
      const updatedStock = await this.stockRepo.save(stock);
      entry.stock = updatedStock;
      entry.stock_id = updatedStock.stock_id;
      return (await this.entryRepo.save(entry)) as StockEntry;
    } else return null;
  }

  async softDeleteEntryById(id: number): Promise<Object> {
    const entryToRemove: StockEntryEntity | null = await this.getEntryById(id);
    if (entryToRemove) {
      const stock = (await this.getStockById(
        entryToRemove?.stock.stock_id
      )) as Stock;
      if (stock) {
        entryToRemove.soft_delete = true;
        const updatedEntry = await this.entryRepo.save(entryToRemove);
        if (updatedEntry) {
          stock.cantidad = stock.cantidad - entryToRemove.cantidad;
          await this.stockRepo.save(stock);
          return { status: "OK" };
        } else throw new Error("Something went wrong");
      } else return { error: "entry's stock not found!" };
    } else return { error: "entry not found!" };
  }

  async updateEntry(entry: StockEntry): Promise<StockEntryEntity | null> {
    const oldEntry = await this.getEntryById(entry.entry_id);
    if (oldEntry) {
      const oldQuantity: number = oldEntry?.cantidad;
      const newQuantity: number = entry.cantidad;
      const stock = await this.getStockById(oldEntry?.stock.stock_id);
      if (stock) {
        stock.cantidad = stock.cantidad - oldQuantity;
        stock.cantidad = stock.cantidad + newQuantity;
        // let entries = stock.entries;
        // entries.push(entry);
        // stock.entries = entries;
        await this.stockRepo.save(stock);
        entry.createdAt = oldEntry.createdAt;
        entry.soft_delete = oldEntry.soft_delete;
        entry.stock_id = oldEntry.stock_id;
        return await this.entryRepo.save(entry);
      } else return null;
    } else return null;
  }

  async getStockById(id: number): Promise<Stock> {
    return (await this.stockRepo.findOneBy({
      stock_id: id,
      soft_delete: false,
    })) as Stock;
  }
}
