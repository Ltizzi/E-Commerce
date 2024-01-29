import { Stock } from "../../models/Stock";
import { StockEntry } from "../../models/StockEntry";
import { StockService } from "../../services/StockService";
import { StockRequest } from "../requests/stock.request";
import { StockResponse } from "../responses/stock.response";
import { ProductMapper } from "./product.mapper";
import { StockEntryMapper } from "./stockEntry.mapper";

const prodMapper = new ProductMapper();
const stockServ = new StockService();
const entryMapper = new StockEntryMapper();

export class StockMapper {
  toStockResponse(stock: Stock): StockResponse {
    const stockRes = {} as StockResponse;
    stockRes.stock_id = stock.stock_id;
    console.log("FROM MAPPER");
    console.log(stock);
    stockRes.product = prodMapper.toProductResponse(stock.product);
    stockRes.cantidad = stock.cantidad;
    return stockRes;
  }

  async toStockEntity(fromStock: StockResponse | StockRequest): Promise<Stock> {
    let stock = {} as Stock;
    if (fromStock.stock_id) {
      stock = (await stockServ.getStockById(fromStock.stock_id)) as Stock;
    }
    if (fromStock.hasOwnProperty("entries")) {
      stock.entries = (await entryMapper.toArrayEntryEntity(
        fromStock.entries
      )) as Array<StockEntry>;
    }
    stock.cantidad = fromStock.cantidad;
    stock.product = await prodMapper.toProductEntity(fromStock.product);
    return stock;
  }

  toArrayStockResponse(stocks: Array<Stock>): Array<StockResponse> {
    let stocksRes = [] as Array<StockResponse>;
    stocks.forEach((stock) => stocksRes.push(this.toStockResponse(stock)));
    return stocksRes;
  }
}
