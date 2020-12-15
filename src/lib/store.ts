import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import { rootReducer } from "./reducers";
import { AppState, StoreState, StoreType } from "./types";
import { createDefault as createDefaultUser } from "../lib/entities/user";

function loadState(): StoreType {
    // TODO: implement
    return {
        user: createDefaultUser(),
    };
}

function saveState(state: AppState) {
    // TODO: implement
}

export const configureStore = (): StoreState => {
    const storeLogger = createLogger();
    const enhancer = composeWithDevTools(applyMiddleware(storeLogger));
    const store = createStore(rootReducer, loadState(), enhancer);
    store.subscribe(() => {
        saveState(store.getState());
    });
    return store;
};
