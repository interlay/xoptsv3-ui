import { UpdateBTCSpot, UPDATE_BTC_SPOT } from "../types";

export const updateBTCSpotPriceAction = (price: number): UpdateBTCSpot => ({
    type: UPDATE_BTC_SPOT,
    price,
});
