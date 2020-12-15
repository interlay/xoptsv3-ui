export const UPDATE_BTC_SPOT = "UPDATE_BTC_SPOT";

export interface UpdateBTCSpot {
    type: typeof UPDATE_BTC_SPOT;
    price: number;
}

export type PriceActions = UpdateBTCSpot;
