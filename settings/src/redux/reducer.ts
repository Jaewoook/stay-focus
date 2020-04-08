import { ActionType, getType } from "typesafe-actions";
import * as actions from "./actions";
import { SiteInfo } from "../utils";

type Actions = ActionType<typeof actions>;

type State = {
    blockList: SiteInfo[],
    allowList: SiteInfo[],
};

const INITIAL_STATE: State = {
    blockList: [],
    allowList: [],
};

export const reducer = (state: State = INITIAL_STATE, { type, payload }: Actions): State => {
    switch (type) {
        case getType(actions.updateBlockList):
            return {
                ...state,
                blockList: payload.list || [],
            };
        case getType(actions.updateAllowList):
            return {
                ...state,
                allowList: payload.list || [],
            };
        default:
            return state;
    }
};
