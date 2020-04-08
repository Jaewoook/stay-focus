import { createStore } from "redux";
import { StateType } from "typesafe-actions";
import { reducer } from "./reducer";

export type State = StateType<typeof reducer>;

export default function() {
    const store = createStore(reducer);

    return store;
}
