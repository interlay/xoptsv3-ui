import { Option } from "../../../xopts-lib";
import { OptionActions, ADD_OPTION } from "../actions/option.actions";
import { Optional } from "../types";

type optionsState = { optionsCache: Option[]; currentOption: Optional<Option> };
export const initialState: optionsState = { optionsCache: [], currentOption: null };

const optionReducer = (state: optionsState = initialState, action: OptionActions): optionsState => {
    switch (action.type) {
        case ADD_OPTION:
            return {
                optionsCache: [action.option, ...state.optionsCache],
                currentOption: action.option,
            };
        default:
            return state;
    }
};

export default optionReducer;
