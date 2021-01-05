import { Option, XOpts } from "../../../xopts-lib";
import { AppDispatch } from "../store";

export const ADD_OPTION = "ADD_OPTION";

export interface AddOptionAction {
    type: typeof ADD_OPTION;
    option: Option;
}

export function addOption(option: Option): AddOptionAction {
    return { type: ADD_OPTION, option };
}

export function storeOption(
    xopts: XOpts,
    option: Option
): (dispatch: AppDispatch) => Promise<void> {
    return async (dispatch: AppDispatch) => {
        const optionId = await xopts.saveOption(option);
        console.log("ID: ", optionId);
        dispatch(addOption({ id: optionId, ...option }));
    };
}

export function loadOption(
    xopts: XOpts,
    optionId: string
): (dispatch: AppDispatch) => Promise<void> {
    return async (dispatch: AppDispatch) => {
        const option = await xopts.loadOption(optionId);
        dispatch(addOption({ id: optionId, ...option }));
        console.log("Added opt to store");
    };
}

export type OptionActions = AddOptionAction;
