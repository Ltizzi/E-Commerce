import { Request, Response } from "express";
import { StockEntryService } from "../services/StockEntryService";
import { StockEntry } from "../models/StockEntry";
import { PaginationParams } from "../models/utils/PaginationParams";
import { DeleteObjectResponse } from "../models/utils/DeleteObjectResponse";

export class StockEntryController {
  private entryServ = new StockEntryService();

  async httpGetAllEntries(req: Request, res: Response): Promise<Response> {
    try {
      const entries =
        (await this.entryServ.getAllEntries()) as Array<StockEntry>;
      return res.status(200).json(entries);
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
      const entries = (await this.entryServ.getEntriesWithPagination(
        page,
        pageSize
      )) as Array<StockEntry>;
      return res.status(200).json(entries);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpGetEntryById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.query.id as unknown as number;
      const entry = (await this.entryServ.getEntryById(id)) as StockEntry;
      return res.status(200).json(entry);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpGetTotalEntriesNumber(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const totalNumber = (await this.entryServ.countEntries()) as number;
      return res.status(200).json({ total: totalNumber });
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpCreateNewEntry(req: Request, res: Response): Promise<Response> {
    try {
      const entry = req.body as unknown as StockEntry;
      const newEntry = (await this.entryServ.saveEntry(entry)) as StockEntry;
      return res.status(200).json(newEntry);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpSoftDeleteEntry(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.query.id as unknown as number;
      const response = (await this.entryServ.softDeleteEntryById(
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
      const entry = req.body as unknown as StockEntry;
      const updatedEntry = (await this.entryServ.updateEntry(
        entry
      )) as StockEntry;
      return res.status(200).json(updatedEntry);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }
}
