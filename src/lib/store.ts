import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import ReduxThunk from "redux-thunk";
import { createDefault as createDefaultUser } from "../lib/entities/user";
import { rootReducer } from "./reducers";
import { AppState, StoreType } from "./types";

const STORAGE_KEY = "APP_STORAGE";

// NOTE: next.js seems to do some sort of server-side compilation and fails if
// localStorage, window or anything only available from the browser is used
const hasLocalStorage = typeof window !== "undefined" && window.localStorage;

function loadState(): StoreType {
    if (hasLocalStorage) {
        const savedState = localStorage.getItem(STORAGE_KEY);
        if (savedState) {
            return JSON.parse(savedState);
        }
    }
    return {
        user: createDefaultUser(),
    };
}

function saveState(state: AppState) {
    if (hasLocalStorage) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
}

// XXX: not sure how to type this properly so let typescript infer it
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const configureStore = () => {
    const storeLogger = createLogger();
    const enhancer = composeWithDevTools(applyMiddleware(storeLogger, ReduxThunk));
    const store = createStore(rootReducer, loadState(), enhancer);
    store.subscribe(() => {
        saveState(store.getState());
    });
    return store;
};

export const store = configureStore();
export type AppDispatch = ReturnType<typeof configureStore>["dispatch"];
