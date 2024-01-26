import { Purchase } from "../../models/Purchase";
import { PurchaseService } from "../../services/PurchaseService";
import { PurchaseRequest } from "../requests/purchase.request";
import { PurchaseResponse } from "../responses/purchase.response";
import { ShopOrderMapper } from "./shopOrder.mapper";

const orderMapper = new ShopOrderMapper();
const purchasesServ = new PurchaseService();

export class PurchaseMapper {
  toPurchaseResponse(purchase: Purchase): PurchaseResponse {
    const res = {} as PurchaseResponse;
    res.purchase_id = purchase.purchase_id;
    res.total_income = purchase.total_income;
    res.user_id = purchase.user.user_id;
    res.orders = orderMapper.toArrayOrderResponse(purchase.orders);
    res.createdAt = purchase.createdAt;
    return res;
  }

  async toPurchaseEntity(
    fromPurchase: PurchaseResponse | PurchaseRequest
  ): Promise<Purchase> {
    let purchase = {} as Purchase;
    if (fromPurchase.purchase_id) {
      purchase = (await purchasesServ.getPurchaseById(
        fromPurchase.purchase_id
      )) as Purchase;
    }
    purchase.orders = await orderMapper.toArrayOrderEntity(fromPurchase.orders);
    return purchase;
  }

  toArrayPurchaseResponse(orders: Array<Purchase>): Array<PurchaseResponse> {
    let res = [] as Array<PurchaseResponse>;
    orders.forEach((order) => res.push(this.toPurchaseResponse(order)));
    return res;
  }

  async toArrayPurchaseEntity(
    compras: Array<PurchaseRequest | PurchaseResponse>
  ): Promise<Array<Purchase>> {
    let purchases = [] as Array<Purchase>;
    compras.forEach(async (compra) =>
      purchases.push(await this.toPurchaseEntity(compra))
    );
    return purchases;
  }
}
