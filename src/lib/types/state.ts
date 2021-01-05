import { Option, Position } from "../../../xopts-lib";
import { PriceData, User } from "../entities";
import { rootReducer } from "../reducers";
import { Optional } from "./utils";

export type AppState = ReturnType<typeof rootReducer>;

export type StoreType = {
    user: User;
    prices: PriceData;
    options: { optionsCache: Option[]; currentOption: Optional<Option> };
    positions: Position[];
};
