import { Request, Response } from "express";
import { PurchaseService } from "../services/PurchaseService";
import { PaginationParams } from "../models/utils/PaginationParams";
import { Purchase } from "../models/Purchase";
import { DeleteObjectResponse } from "../models/utils/DeleteObjectResponse";

export class PurchaseController {
  private purchaseServ = new PurchaseService();

  async httpGetPurchasesWithPagination(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { page, pageSize } = req.query as unknown as PaginationParams;
      const purchases = (await this.purchaseServ.getPurchasesWithPagination(
        page,
        pageSize
      )) as Array<Purchase>;
      return res.status(200).json(purchases);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpPurchasesFromUser(req: Request, res: Response): Promise<Response> {
    try {
      const user_id = req.query.user_id as unknown as number;
      const purchases = (await this.purchaseServ.getPurchasesByUserId(
        user_id
      )) as Array<Purchase>;
      return res.status(200).json(purchases);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpGetPurchaseById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.query.purchase_id as unknown as number;
      const purchase = (await this.purchaseServ.getPurchaseById(
        id
      )) as Purchase;
      return res.status(200).json(purchase);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpGetTotalPurchases(req: Request, res: Response): Promise<Response> {
    try {
      const totalNumber = (await this.purchaseServ.countPurchases()) as number;
      return res.status(200).json({ total: totalNumber });
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpCreateNewPurchase(req: Request, res: Response): Promise<Response> {
    try {
      const purchase = req.body as unknown as Purchase;
      const newPurchase = (await this.purchaseServ.savePurchase(
        purchase
      )) as Purchase;
      return res.status(200).json(newPurchase);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpSoftDeletePurchaseById(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const id = req.query.purchase_id as unknown as number;
      const response = (await this.purchaseServ.deletePurchaseById(
        id
      )) as DeleteObjectResponse;
      if (response.status == "OK") return res.status(200).json();
      else throw new Error("Something went wrong");
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpUpdatePurchase(req: Request, res: Response): Promise<Response> {
    try {
      const purchase = req.body as unknown as Purchase;
      const updatedPurchase = (await this.purchaseServ.updatePurchase(
        purchase
      )) as Purchase;
      return res.status(200).json(updatedPurchase);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }
}
