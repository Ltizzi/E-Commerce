import { Deal } from "../../models/Deal";
import { DealService } from "../../services/DealService";
import { DealRequest } from "../requests/deal.request";
import { DealResponse } from "../responses/deal.response";
import { ProductMapper } from "./product.mapper";

const prodMapper = new ProductMapper();
const dealServ = new DealService();

export class DealMapper {
  toDealResponse(deal: Deal): DealResponse {
    const dealRes = {} as DealResponse;
    dealRes.deal_id = deal.deal_id;
    dealRes.product_id = deal.product_id;
    dealRes.product = prodMapper.toProductResponse(deal.product);
    dealRes.units = deal.units;
    dealRes.discount = deal.discount;
    dealRes.discountedPrice = deal.discountedPrice;
    dealRes.fullPrice = deal.fullPrice;
    dealRes.duration = deal.duration;
    dealRes.startAt = deal.startAt;
    dealRes.endAt = deal.endAt;
    dealRes.soft_delete = deal.soft_delete;
    return dealRes;
  }

  async toDealEntity(fromDeal: DealResponse | DealRequest): Promise<Deal> {
    let deal = {} as Deal;
    if (fromDeal.deal_id) {
      deal = (await dealServ.getDealById(fromDeal.deal_id)) as Deal;
    }
    deal.product_id = fromDeal.product_id;
    deal.product = await prodMapper.toProductEntity(fromDeal.product);
    deal.units = fromDeal.units;
    deal.discount = fromDeal.discount;
    deal.discountedPrice = fromDeal.discountedPrice;
    deal.fullPrice = fromDeal.fullPrice;
    deal.duration = fromDeal.duration;
    deal.startAt = fromDeal.startAt;
    deal.endAt = fromDeal.endAt;
    return deal;
  }

  toArrayDealResponse(deals: Array<Deal>): Array<DealResponse> {
    let dealsRes: Array<DealResponse> = [];
    if (deals)
      deals.forEach((deal) => dealsRes.push(this.toDealResponse(deal)));
    return dealsRes;
  }

  async toArrayDealEntity(
    fromDeals: Array<DealRequest | DealResponse>
  ): Promise<Array<Deal>> {
    let deals: Array<Deal> = [];
    if (fromDeals) {
      fromDeals.forEach(async (deal) => {
        deals.push(await this.toDealEntity(deal));
      });
    }
    return deals;
  }
}
