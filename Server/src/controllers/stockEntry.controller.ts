import { Request, Response } from "express";
import { StockEntryService } from "../services/StockEntryService";
import { StockEntry } from "../models/StockEntry";
import { PaginationParams } from "../models/utils/PaginationParams";
import { DeleteObjectResponse } from "../models/utils/DeleteObjectResponse";
import { StockEntryMapper } from "../dto/mappers/stockEntry.mapper";
import { StockEntryRequest } from "../dto/requests/stockEntry.request";

const entryServ = new StockEntryService();
const mapper = new StockEntryMapper();

export class StockEntryController {
  //private entryServ = new StockEntryService();

  async httpGetAllEntries(req: Request, res: Response): Promise<Response> {
    try {
      const entries = (await entryServ.getAllEntries()) as Array<StockEntry>;
      return res.status(200).json(mapper.toArrayEntryResponse(entries));
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpEntriesWithPagination(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { page, pageSize } = req.query as unknown as PaginationParams;
      const entries = (await entryServ.getEntriesWithPagination(
        page,
        pageSize
      )) as Array<StockEntry>;
      return res.status(200).json(mapper.toArrayEntryResponse(entries));
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpGetEntryById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.query.entry_id as unknown as number;
      const entry = (await entryServ.getEntryById(id)) as StockEntry;
      return res.status(200).json(mapper.toStockEntryResponse(entry));
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpGetTotalEntriesNumber(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const totalNumber = (await entryServ.countEntries()) as number;
      return res.status(200).json({ total: totalNumber });
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpCreateNewEntry(req: Request, res: Response): Promise<Response> {
    try {
      const entry = req.body as unknown as StockEntryRequest;
      const newEntry = (await entryServ.saveEntry(
        await mapper.toStockEntryEntity(entry)
      )) as StockEntry;
      return res.status(200).json(mapper.toStockEntryResponse(newEntry));
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpSoftDeleteEntry(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.query.entry_id as unknown as number;
      const response = (await entryServ.softDeleteEntryById(
        id
      )) as DeleteObjectResponse;
      if (response.status == "OK") return res.status(200).json(response);
      else throw new Error("Something went wrong!");
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpUpdateEntry(req: Request, res: Response): Promise<Response> {
    try {
      const entry = req.body as unknown as StockEntryRequest;
      const updatedEntry = (await entryServ.updateEntry(
        await mapper.toStockEntryEntity(entry)
      )) as StockEntry;
      return res.status(200).json(mapper.toStockEntryResponse(updatedEntry));
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }
}
