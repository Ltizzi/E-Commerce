import { Request, Response } from "express";
import { StockService } from "../services/StockService";
import { Stock } from "../models/Stock";
import { PaginationParams } from "../models/utils/PaginationParams";
import { DeleteObjectResponse } from "../models/utils/DeleteObjectResponse";

export class StockController {
  private stockServ = new StockService();

  async httpGetAllStocks(req: Request, res: Response): Promise<Response> {
    try {
      const stocks = (await this.stockServ.getStocks()) as Array<Stock>;
      return res.status(200).json(stocks);
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
      const stocks = (await this.stockServ.getStockWithPagination(
        page,
        pageSize
      )) as Array<Stock>;
      return res.status(200).json(stocks);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpGetStockById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.query.id as unknown as number;
      const stock = (await this.stockServ.getStockById(id)) as Stock;
      return res.status(200).json(stock);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpIsThereStockForProduct(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const id = req.query.id as unknown as number;
      const isThereStock = (await this.stockServ.isThereStockForProduct(
        id
      )) as boolean;
      return res.status(200).json({ stock: isThereStock });
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpCreateNewStock(req: Request, res: Response): Promise<Response> {
    try {
      const stock = req.body as unknown as Stock;
      const newStock = (await this.stockServ.saveStock(stock)) as Stock;
      return res.status(200).json(newStock);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpSoftDeleteStockById(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const id = req.query.id as unknown as number;
      const response = (await this.stockServ.softDeleteStockById(
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
      const stock = req.body as unknown as Stock;
      const updatedStock = (await this.stockServ.updateStock(stock)) as Stock;
      return res.status(200).json(updatedStock);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }
}
