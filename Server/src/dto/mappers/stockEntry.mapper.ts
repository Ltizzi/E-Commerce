import { StockEntryEntity } from "../../entities/StockEntryEntity";
import { Stock } from "../../models/Stock";
import { StockEntry } from "../../models/StockEntry";
import { StockEntryService } from "../../services/StockEntryService";
import { StockService } from "../../services/StockService";
import { StockRequest } from "../requests/stock.request";
import { StockEntryRequest } from "../requests/stockEntry.request";
import { StockResponse } from "../responses/stock.response";
import { StockEntryResponse } from "../responses/stockEntry.response";
import { ProductMapper } from "./product.mapper";

const entryServ = new StockEntryService();
const stockServ = new StockService();

export class StockEntryMapper {
  toStockEntryResponse(entry: StockEntry): StockEntryResponse {
    const entryRes = {} as StockEntryResponse;
    entryRes.entry_id = entry.entry_id;
    // entryRes.product = prodMapper.toProductResponse(entry.product);
    entryRes.stock = mapper.toStockResponse(entry.stock);
    entryRes.stock_id = entry.stock_id;
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
    entry.stock = await mapper.toStockEntity(
      (await stockServ.getStockById(fromEntry.stock_id)) as Stock
    );
    // entry.product = prodMapper.toProductEntity(
    //   fromEntry.product
    // ) as unknown as Product;
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
    //   console.log("FROM ENTRY MAPPER");
    fromEntries.forEach(async (entry) =>
      entries.push(await this.toStockEntryEntity(entry))
    );
    return entries;
  }
}

const prodMapper = new ProductMapper();
//const stockServ = new StockService();
const entryMapper = new StockEntryMapper();

export class StockMapper {
  toStockResponse(stock: Stock): StockResponse {
    const stockRes = {} as StockResponse;
    stockRes.stock_id = stock.stock_id;
    // console.log("FROM MAPPER");
    // console.log(stock);
    stockRes.product = prodMapper.toProductResponse(stock.product);
    stockRes.product_id = stock.product_id;
    stockRes.cantidad = stock.cantidad;
    return stockRes;
  }

  async toStockEntity(fromStock: StockResponse | StockRequest): Promise<Stock> {
    let stock = {} as Stock;
    if (fromStock.stock_id) {
      stock = (await stockServ.getStockById(fromStock.stock_id)) as Stock;
    }
    // if (fromStock.hasOwnProperty("entries")) {
    //   stock.entries = (await entryMapper.toArrayEntryEntity(
    //     fromStock.entries
    //   )) as Array<StockEntry>;
    // }
    stock.cantidad = fromStock.cantidad;
    stock.product = await prodMapper.toProductEntity(fromStock.product);
    stock.product_id = fromStock.product_id;
    return stock;
  }

  toArrayStockResponse(stocks: Array<Stock>): Array<StockResponse> {
    let stocksRes = [] as Array<StockResponse>;
    stocks.forEach((stock) => stocksRes.push(this.toStockResponse(stock)));
    return stocksRes;
  }
}

const mapper = new StockMapper();
