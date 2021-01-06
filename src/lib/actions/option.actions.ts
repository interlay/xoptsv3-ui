import { Option } from "../../../xopts-lib";

export const ADD_OPTION = "ADD_OPTION";

export interface AddOptionAction {
    type: typeof ADD_OPTION;
    option: Option;
}

export function addOption(option: Option): AddOptionAction {
    return { type: ADD_OPTION, option };
}

export type OptionActions = AddOptionAction;
