import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import { rootReducer } from "./reducers";
import { AppState, StoreState } from "./types";

function loadState(): AppState {
    // TODO: implement
    return {};
}

function saveState(state: AppState) {
    // TODO: implement
}

export const configureStore = (): StoreState => {
    const storeLogger = createLogger();
    const store = createStore(rootReducer, {}, composeWithDevTools(applyMiddleware(storeLogger)));
    store.subscribe(() => {
        saveState(store.getState());
    });
    return store;
};
