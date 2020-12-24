import { Position, XOpts } from "../../../xopts-lib";
import { AppDispatch } from "../store";

export const SET_POSITIONS = "SET_POSITIONS";

export interface SetPositionsAction {
    type: typeof SET_POSITIONS;
    positions: Position[];
}

export function setPositions(positions: Position[]): SetPositionsAction {
    return { type: SET_POSITIONS, positions };
}

export function fetchPositions(xopts: XOpts): (dispatch: AppDispatch) => Promise<void> {
    return async (dispatch: AppDispatch) => {
        const positions = await xopts.loadPositions();
        dispatch(setPositions(positions));
    };
}

export type PositionActions = SetPositionsAction;
