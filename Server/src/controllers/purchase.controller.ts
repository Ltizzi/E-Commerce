import { Request, Response } from "express";
import { PurchaseService } from "../services/PurchaseService";
import {
  PaginationParams,
  PaginationParamsWithUser,
} from "../models/utils/PaginationParams";
import { Purchase } from "../models/Purchase";
import { DeleteObjectResponse } from "../models/utils/DeleteObjectResponse";
import { PurchaseMapper } from "../dto/mappers/purchase.mapper";
import { PurchaseRequest } from "../dto/requests/purchase.request";

const purchaseServ = new PurchaseService();
const mapper = new PurchaseMapper();

export class PurchaseController {
  // private purchaseServ = new PurchaseService();

  async httpGetPurchasesWithPagination(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { page, pageSize } = req.query as unknown as PaginationParams;
      const purchases = (await purchaseServ.getPurchasesWithPagination(
        page,
        pageSize
      )) as Array<Purchase>;
      return res.status(200).json(mapper.toArrayPurchaseResponse(purchases));
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpPurchasesFromUser(req: Request, res: Response): Promise<Response> {
    try {
      const user_id = req.query.user_id as unknown as number;
      const purchases = (await purchaseServ.getPurchasesByUserId(
        user_id
      )) as Array<Purchase>;
      return res.status(200).json(mapper.toArrayPurchaseResponse(purchases));
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpGetPurchaseById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.query.purchase_id as unknown as number;
      const purchase = (await purchaseServ.getPurchaseById(id)) as Purchase;
      return res.status(200).json(mapper.toPurchaseResponse(purchase));
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpGetTotalPurchases(req: Request, res: Response): Promise<Response> {
    try {
      const totalNumber = (await purchaseServ.countPurchases()) as number;
      return res.status(200).json({ total: totalNumber });
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpCreateNewPurchase(req: Request, res: Response): Promise<Response> {
    try {
      const purchase = req.body as unknown as PurchaseRequest;
      const purchEntity = await mapper.toPurchaseEntity(purchase);
      const newPurchase = (await purchaseServ.savePurchase(
        purchEntity
      )) as Purchase;
      return res.status(200).json(mapper.toPurchaseResponse(newPurchase));
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
      const response = (await purchaseServ.deletePurchaseById(
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
      const purchase = req.body as unknown as PurchaseRequest;
      const updatedPurchase = (await purchaseServ.updatePurchase(
        await mapper.toPurchaseEntity(purchase)
      )) as Purchase;
      return res.status(200).json(mapper.toPurchaseResponse(updatedPurchase));
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpCountPurchasesByUserId(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const user_id = req.query.user_id as unknown as number;
      const totalPurchases = (await purchaseServ.countPurchasesByUserId(
        user_id
      )) as number;
      return res.status(200).json({ total: totalPurchases });
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpGetPurchasesFromUserWithPagination(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { user_id, page, pageSize } =
        req.query as unknown as PaginationParamsWithUser;
      const purchases = await purchaseServ.getPurchasesByUserIdWithPagination(
        user_id,
        page,
        pageSize
      );
      return res.status(200).json(mapper.toArrayPurchaseResponse(purchases));
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpGetTotalIncome(req: Request, res: Response): Promise<Response> {
    try {
      const income = await purchaseServ.getTotalIncome();
      return res.status(200).json({ total: income });
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpGetAnnualIncome(req: Request, res: Response): Promise<Response> {
    try {
      const income = await purchaseServ.getYearIncome();
      return res.status(200).json({ total: income });
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpGetMonthlyIncome(req: Request, res: Response): Promise<Response> {
    try {
      const income = await purchaseServ.getMonthlyIncome();
      return res.status(200).json({ total: income });
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpGetWeeklyIncome(req: Request, res: Response): Promise<Response> {
    try {
      const income = await purchaseServ.getWeeklyIncome();
      return res.status(200).json({ total: income });
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }
}
