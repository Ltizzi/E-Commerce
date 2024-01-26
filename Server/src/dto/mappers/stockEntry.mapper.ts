import { StockEntryEntity } from "../../entities/StockEntryEntity";
import { StockEntry } from "../../models/StockEntry";
import { StockEntryService } from "../../services/StockEntryService";
import { StockService } from "../../services/StockService";
import { StockEntryRequest } from "../requests/stockEntry.request";
import { StockEntryResponse } from "../responses/stockEntry.response";
import { ProductMapper } from "./product.maper";
import { StockMapper } from "./stock.mapper";

const prodMapper = new ProductMapper();
const stockMapper = new StockMapper();
const stockServ = new StockService();
const entryServ = new StockEntryService();

export class StockEntryMapper {
  toStockEntryResponse(entry: StockEntry): StockEntryResponse {
    const entryRes = {} as StockEntryResponse;
    entryRes.entry_id = entry.entry_id;
    // entryRes.product = prodMapper.toProductResponse(entry.product);
    entryRes.stock = stockMapper.toStockResponse(entry.stock);
    entryRes.cantidad = entry.cantidad;
    return entryRes;
  }

  async toStockEntryEntity(
    fromEntry: StockEntryResponse | StockEntryRequest
  ): Promise<StockEntryEntity> {
    let entry = {} as StockEntry;
    if (fromEntry.entry_id) {
      entry = (await entryServ.getEntryById(fromEntry.entry_id)) as StockEntry;
    }
    entry.cantidad = fromEntry.cantidad;
    entry.stock = await stockMapper.toStockEntity(fromEntry.stock);
    return entry;
  }

  toArrayEntryResponse(entries: Array<StockEntry>): Array<StockEntryResponse> {
    let entriesRes = [] as Array<StockEntryResponse>;
    entries.forEach((entry) =>
      entriesRes.push(this.toStockEntryResponse(entry))
    );
    return entriesRes;
  }

  async toArrayEntryEntity(
    fromEntries: Array<StockEntryRequest | StockEntryResponse>
  ): Promise<Array<StockEntry>> {
    let entries = [] as Array<StockEntry>;
    fromEntries.forEach(async (entry) =>
      entries.push(await this.toStockEntryEntity(entry))
    );
    return entries;
  }
}
