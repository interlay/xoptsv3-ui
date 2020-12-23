import { PriceData, User } from "../entities";
import { rootReducer } from "../reducers";

export type AppState = ReturnType<typeof rootReducer>;

export type StoreType = {
    user: User;
    prices: PriceData;
};
