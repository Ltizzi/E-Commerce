import { Deal } from './deal';

export interface DealCheckerResponse {
  hasDeal: boolean;
  deal: Deal;
  timeRemaining: number;
}
