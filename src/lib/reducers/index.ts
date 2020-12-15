import { combineReducers } from "redux";

import userReducer from "./user.reducer";
import priceReducer from "./prices.reducer";

export const rootReducer = combineReducers({ user: userReducer, prices: priceReducer });
