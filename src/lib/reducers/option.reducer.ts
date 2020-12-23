import { Option } from "../../../xopts-lib";
import { OptionActions, ADD_OPTION } from "../actions/option.actions";

export const initialState: Option[] = [];

const positionReducer = (state: Option[] = initialState, action: OptionActions): Option[] => {
    switch (action.type) {
        case ADD_OPTION:
            return [action.option, ...state];
        default:
            return state;
    }
};

export default positionReducer;
