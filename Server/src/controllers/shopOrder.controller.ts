import { Request, Response } from "express";
import { ShopOrderService } from "../services/ShopOrderService";
import { ShopOrder } from "../models/ShopOrder";
import { PaginationParams } from "../models/utils/PaginationParams";
import { DeleteObjectResponse } from "../models/utils/DeleteObjectResponse";
import { Cart } from "../models/Cart";

const orderServ = new ShopOrderService();

export class ShopOrderController {
  //private orderServ: ShopOrderService;

  // constructor() {
  //   this.orderServ = new ShopOrderService();
  // }

  async httpGetAllOrders(req: Request, res: Response): Promise<Response> {
    try {
      const orders = (await orderServ.getAllOrders()) as Array<ShopOrder>;
      return res.status(200).json(orders);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpGetOrdersWithPagination(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { page, pageSize } = req.query as unknown as PaginationParams;
      const orders = (await orderServ.getOrdersWithPagination(
        page,
        pageSize
      )) as Array<ShopOrder>;
      return res.status(200).json(orders);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpGetOrdersByUserId(req: Request, res: Response): Promise<Response> {
    try {
      const user_id = req.query.user_id as unknown as number;
      const orders = (await orderServ.getOrdersByUserId(
        user_id
      )) as Array<ShopOrder>;
      return res.status(200).json(orders);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpGetOrderById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.query.order_id as unknown as number;
      const order = (await orderServ.getOrderById(id)) as ShopOrder;
      return res.status(200).json(order);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpCreateShopOrder(req: Request, res: Response): Promise<Response> {
    try {
      const cart = req.body as unknown as Cart;
      const newOrder = (await orderServ.saveOrder(cart)) as ShopOrder;
      return res.status(200).json(newOrder);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpSoftDeleteOrderById(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const id = req.query.order_id as unknown as number;
      const response = (await orderServ.softDeleteOrderById(
        id
      )) as DeleteObjectResponse;
      if (response.status == "OK") return res.status(200).json();
      else throw new Error("Something went wrong");
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpUpdateShopOrder(req: Request, res: Response): Promise<Response> {
    try {
      const order = req.body as unknown as ShopOrder;
      const updatedOrder = (await orderServ.updateOrder(order)) as ShopOrder;
      return res.status(200).json(updatedOrder);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }
}
