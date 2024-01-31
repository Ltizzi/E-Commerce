import { Request, Response } from "express";
import { StockService } from "../services/StockService";
import { Stock } from "../models/Stock";
import { PaginationParams } from "../models/utils/PaginationParams";
import { DeleteObjectResponse } from "../models/utils/DeleteObjectResponse";
import { StockMapper } from "../dto/mappers/stock.mapper";
import { StockRequest } from "../dto/requests/stock.request";

const stockServ = new StockService();
const mapper = new StockMapper();

export class StockController {
  //private stockServ = new StockService();

  async httpGetAllStocks(req: Request, res: Response): Promise<Response> {
    try {
      const stocks = (await stockServ.getStocks()) as Array<Stock>;
      return res.status(200).json(mapper.toArrayStockResponse(stocks));
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpGetStocksWithPagination(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { page, pageSize } = req.query as unknown as PaginationParams;
      const stocks = (await stockServ.getStockWithPagination(
        page,
        pageSize
      )) as Array<Stock>;
      return res.status(200).json(mapper.toArrayStockResponse(stocks));
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpGetStockById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.query.stock_id as unknown as number;
      const stock = (await stockServ.getStockById(id)) as Stock;
      return res.status(200).json(mapper.toStockResponse(stock));
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpIsThereStockForProduct(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const id = req.query.product_id as unknown as number;
      const isThereStock = (await stockServ.isThereStockForProduct(
        id
      )) as boolean;
      return res.status(200).json({ stock: isThereStock });
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpCountStocks(req: Request, res: Response): Promise<Response> {
    try {
      const totalStocks = (await stockServ.countStocks()) as number;
      return res.status(200).json({ total: totalStocks });
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpCreateNewStock(req: Request, res: Response): Promise<Response> {
    try {
      const stock = req.body as unknown as StockRequest;
      const newStock = (await stockServ.saveStock(
        await mapper.toStockEntity(stock)
      )) as Stock;
      return res.status(200).json(mapper.toStockResponse(newStock));
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpSoftDeleteStockById(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const id = req.query.stock_id as unknown as number;
      const response = (await stockServ.softDeleteStockById(
        id
      )) as DeleteObjectResponse;
      if (response.status == "OK") return res.status(200).json(response);
      else throw new Error("Something went wrong");
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpUpdateStock(req: Request, res: Response): Promise<Response> {
    try {
      const stock = req.body as unknown as StockRequest;
      const updatedStock = (await stockServ.updateStock(
        await mapper.toStockEntity(stock)
      )) as Stock;
      return res.status(200).json(mapper.toStockResponse(updatedStock));
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }
}
