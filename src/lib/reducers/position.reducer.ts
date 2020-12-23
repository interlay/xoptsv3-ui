import { Position } from "../../../xopts-lib";
import { PositionActions, SET_POSITIONS } from "../actions/position.action";

export const initialState: Position[] = [];

const positionReducer = (state: Position[] = initialState, action: PositionActions): Position[] => {
    switch (action.type) {
    case SET_POSITIONS:
        return action.positions;
    default:
        return state;
    }
};

export default positionReducer;
