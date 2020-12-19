import { CombinedState, Store } from "redux";
import { rootReducer } from "../reducers";
import { CombinedActions } from "./actions";
import { User } from "../entities";

export type AppState = ReturnType<typeof rootReducer>;

export type dispatcher = {
    // eslint-disable-next-line
    dispatch: any;
};

export type StoreType = {
    user: User;
};

export type StoreState = Store<CombinedState<StoreType>, CombinedActions> & dispatcher;
