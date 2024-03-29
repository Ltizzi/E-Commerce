import { Deal } from "../models/Deal";
import { DealCheckerResponse } from "../models/utils/DealCheckerResponse";
import { DealService } from "../services/DealService";

export class DealTracker {
  private static instance: DealTracker;
  private dealServ = new DealService();
  private queue = [] as Array<DealCheckerResponse>;

  constructor() {}

  public static getInstance(): DealTracker {
    if (!DealTracker.instance) {
      DealTracker.instance = new DealTracker();
    }
    return DealTracker.instance;
  }

  async dealTrackerBuilder() {
    console.log("Starting deal tracker...");
    console.log("Server Time: " + new Date());
    await this.fetchDeals();
    if (this.queue.length > 0) {
      console.log("Generating timers");
      await this.createTimers(this.queue);
    }
  }

  getQueue() {
    return this.queue;
  }

  checkDealIsInQueue(deal_id: number) {
    const deal = this.queue.filter(
      (dealCheck) => dealCheck.deal?.deal_id == deal_id
    );
    return deal.length > 0;
  }

  async fetchDeals() {
    const deals = await this.dealServ.getDeals();
    deals.forEach(async (deal: Deal) => {
      const dealCheckerRes = await this.dealServ.checkProductHasDealById(
        deal.product_id
      );
      //    console.log(dealCheckerRes);
      if (
        dealCheckerRes.hasDeal &&
        dealCheckerRes.timeRemaining &&
        dealCheckerRes.timeRemaining > 0
      ) {
        this.queue.push(dealCheckerRes);
        await this.addNewTimer(dealCheckerRes);
      }
      if (
        dealCheckerRes.hasDeal &&
        dealCheckerRes.timeRemaining &&
        dealCheckerRes.timeRemaining < 0 &&
        dealCheckerRes.deal
      ) {
        const id = dealCheckerRes.deal.deal_id;
        console.log("removing deal id nº... ");
        console.log(id);
        await this.dealServ.softDeleteDeaById(id);
        this.removeDealFromQueue(dealCheckerRes.deal.deal_id);
      }
    });
  }

  async createTimers(queue: Array<DealCheckerResponse>) {
    queue.forEach(async (deal) => {
      await this.addNewTimer(deal);
    });
  }

  async addNewTimer(deal: DealCheckerResponse) {
    const dealToUpdate = deal.deal as Deal;
    if (dealToUpdate) {
      console.log("Generating timer for deal id: " + dealToUpdate.deal_id) +
        " . . .";
      console.log("Time remaining: " + deal.timeRemaining);
      setTimeout(async () => {
        const outdatedDeal = (await this.dealServ.restoreProductPrice(
          dealToUpdate
        )) as Deal;
        this.removeDealFromQueue(outdatedDeal.deal_id);
        console.log(
          "Deal id " + dealToUpdate.deal_id + " is over! removed from queue"
        );
      }, deal.timeRemaining as number);
    }
  }

  removeDealFromQueue(deal_id: number) {
    this.queue = this.queue.filter(
      (dealCheck) => dealCheck.deal?.deal_id != deal_id
    );
  }
}
