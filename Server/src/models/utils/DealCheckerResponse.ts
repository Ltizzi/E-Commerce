import { DealResponse } from "../../dto/responses/deal.response";
import { Deal } from "../Deal";
export interface DealCheckerResponse {
  hasDeal: boolean;
  deal: Deal | DealResponse | null;
  timeRemaining: number | null;
}
