import { ShopOrder } from "../../models/ShopOrder";
import { ShopOrderService } from "../../services/ShopOrderService";
import { ShopOrderRequest } from "../requests/shopOrder.request";
import { ShopOrderResponse } from "../responses/shopOrder.response";
import { ProductMapper } from "./product.mapper";
const prodMapper = new ProductMapper();
const orderServ = new ShopOrderService();

export class ShopOrderMapper {
  toShopOrderResponse(order: ShopOrder): ShopOrderResponse {
    const orderRes = {} as ShopOrderResponse;
    orderRes.shop_order_id = order.shop_order_id;
    orderRes.product = prodMapper.toProductResponse(order.product);
    orderRes.cantidad = order.cantidad;
    orderRes.order_state = order.order_state;
    orderRes.total = order.total;
    orderRes.user_id = order.user.user_id;
    return orderRes;
  }

  async toShopOrderEntity(
    fromOrder: ShopOrderRequest | ShopOrderResponse
  ): Promise<ShopOrder> {
    let order = {} as ShopOrder;
    if (fromOrder.shop_order_id) {
      order = (await orderServ.getOrderById(
        fromOrder.shop_order_id
      )) as ShopOrder;
    }
    order.order_state = fromOrder.order_state;
    order.product = await prodMapper.toProductEntity(fromOrder.product);
    order.cantidad = fromOrder.cantidad;
    order.total = fromOrder.total;
    return order;
  }

  toArrayOrderResponse(orders: Array<ShopOrder>): Array<ShopOrderResponse> {
    let res = [] as Array<ShopOrderResponse>;
    orders.forEach((order) => res.push(this.toShopOrderResponse(order)));
    return res;
  }

  async toArrayOrderEntity(
    fromOrders: Array<ShopOrderRequest | ShopOrderResponse>
  ): Promise<Array<ShopOrder>> {
    let orders = [] as Array<ShopOrder>;
    fromOrders.forEach(async (order) =>
      orders.push(await this.toShopOrderEntity(order))
    );
    return orders;
  }
}
