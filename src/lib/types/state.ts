import { Store } from "redux";
import { rootReducer } from "../reducers";

export type AppState = ReturnType<typeof rootReducer>;

export type StoreState = Store<{}>;
