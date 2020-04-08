import React from 'react';
import { Flex, Split, Typo } from "@salesboost/malta";
import { Layout, NewItem, ListItem } from "./components";

import { Provider, useDispatch, useSelector } from "react-redux";
import createStore, { State } from "./redux";
import { updateBlockList } from "./redux/actions";
import { Settings, SiteInfo } from "./utils";

export const store = createStore();

const App = () => {
    const dispatch = useDispatch();
    const blockList = useSelector((state: State) => state.blockList);

    React.useEffect(() => {
        chrome.runtime.onMessage.addListener((request, sender, sendRespond) => {
            if (request.UPDATE_SETTINGS) {
                dispatch(updateBlockList(Settings.blockSites));
            }
        });
    }, [dispatch]);

    return (
        <Provider store={store}>
            <Layout>
                <Flex width="300px" flexDirection="column">
                    <Typo name="title_242018_nv90_500">Stay FOCUS</Typo>
                    <Split my="8px" horizontal length="100%" />
                    <Flex flexDirection="column" style={{ marginTop: "4px" }}>
                        {blockList.map(({ url, title }, i) => <ListItem key={i} site={title} url={url} />)}
                        <NewItem />
                    </Flex>
                </Flex>
            </Layout>
        </Provider>
    );
};

export default App;
