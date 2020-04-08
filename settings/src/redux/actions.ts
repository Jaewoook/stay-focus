import * as types from "./ActionTypes";
import { SiteInfo } from "../utils";

//
//  BlockList / Site actions
//
export const updateBlockList = (list: SiteInfo[]) => ({
    type: types.UPDATE_BLOCK_LIST,
    payload: { list },
});

//
//  AllowList / Site actions
//
export const updateAllowList = (list: SiteInfo[]) => ({
    type: types.UPDATE_ALLOW_SITE,
    payload: { list },
});
