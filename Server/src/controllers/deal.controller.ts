import { Request, Response } from "express";
import { DealMapper } from "../dto/mappers/deal.mapper";
import { DealService } from "../services/DealService";
import { PaginationParams } from "../models/utils/PaginationParams";
import { Deal } from "../models/Deal";
import { DealCheckerResponse } from "../models/utils/DealCheckerResponse";
import { DealRequest } from "../dto/requests/deal.request";
import { DeleteObjectResponse } from "../models/utils/DeleteObjectResponse";
import { DealTracker } from "../utils/dealTracker";

const dealServ = new DealService();
const mapper = new DealMapper();
const dealTracker = DealTracker.getInstance();

export class DealController {
  async httpGetDeals(req: Request, res: Response): Promise<Response> {
    try {
      const deals = await dealServ.getDeals();
      return res.status(200).json(mapper.toArrayDealResponse(deals));
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpGetDealsWithPagination(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { page, pageSize } = req.query as unknown as PaginationParams;
      const deals = await dealServ.getDealsWithPagination(page, pageSize);
      return res.status(200).json(mapper.toArrayDealResponse(deals));
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpGetDealById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.query.deal_id as unknown as number;
      const deal = (await dealServ.getDealById(id)) as Deal;
      return res.status(200).json(mapper.toDealResponse(deal));
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpGetDealByProductId(req: Request, res: Response): Promise<Response> {
    try {
      const product_id = req.query.product_id as unknown as number;
      const deal = (await dealServ.getDealByProductId(product_id)) as Deal;
      return res.status(200).json(mapper.toDealResponse(deal));
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpCheckProductHasDealsById(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const product_id = req.query.product_id as unknown as number;
      const dealCheckRes = (await dealServ.checkProductHasDealById(
        product_id
      )) as DealCheckerResponse;
      if (dealCheckRes.hasDeal)
        dealCheckRes.deal = mapper.toDealResponse(dealCheckRes.deal as Deal);
      return res.status(200).json(dealCheckRes);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpCountDeals(req: Request, res: Response): Promise<Response> {
    try {
      const totalNumber = await dealServ.countDeals();
      return res.status(200).json({ total: totalNumber });
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpSaveDeal(req: Request, res: Response): Promise<Response> {
    try {
      const dealReq = req.body as unknown as DealRequest;
      const newDeal = (await dealServ.saveDeal(
        await mapper.toDealEntity(dealReq)
      )) as Deal;
      const dealCheckerRes = await dealServ.checkProductHasDealById(
        newDeal.product_id
      );
      await dealTracker.addNewTimer(dealCheckerRes);
      return res.status(200).json(mapper.toDealResponse(newDeal));
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpSoftDeleteDealById(req: Request, res: Response): Promise<Response> {
    try {
      const deal_id = req.query.deal_id as unknown as number;
      const response = (await dealServ.softDeleteDeaById(
        deal_id
      )) as DeleteObjectResponse;
      if (response.status == "OK") return res.status(200).json();
      else throw new Error(response.error);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpUpdateDeal(req: Request, res: Response): Promise<Response> {
    try {
      const deal = req.body as unknown as DealRequest;
      const updatedDeal = (await dealServ.updateDeal(
        await mapper.toDealEntity(deal)
      )) as Deal;
      return res.status(200).json(mapper.toDealResponse(updatedDeal));
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }
}
