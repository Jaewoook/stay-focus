import * as types from "./ActionTypes";
import { ActionType } from "typesafe-actions";
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
        case types.UPDATE_BLOCK_LIST:
            return {
                ...state,
                blockList: payload.list || [],
            };
        case types.UPDATE_ALLOW_SITE:
            return {
                ...state,
                allowList: payload.list || [],
            };
        default:
            return state;
    }
};
