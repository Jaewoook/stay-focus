import React from 'react';
import { Flex, Split, Typo } from "@salesboost/malta";
import { Layout, NewItem, ListItem } from "./components";

import { useDispatch, useSelector, Provider } from "react-redux";
import { isExtension, Settings } from "./utils";
import createStore, { State } from "./redux";
import { updateBlockList } from "./redux/actions";

export const store = createStore();

const BlockList = () => {
    const dispatch = useDispatch();
    const blockList = useSelector((state: State) => state.blockList);

    const handleRemoveClick = React.useCallback(async (site: string, url: string) => {
        await Settings.removeBlockSite(site, url);
        dispatch(updateBlockList(Settings.blockSites));
    }, [dispatch]);

    return <>
        {blockList.map(({ url, title }, i) => (
            <ListItem key={i}
                site={title} url={url}
                onRemoveClick={handleRemoveClick} />
        ))}
    </>;
}

const App = () => {
    const dispatch = store.dispatch;
    React.useEffect(() => {
        if (isExtension()) {
            (async () => {
                await Settings.loadSettings();
                dispatch(updateBlockList(Settings.blockSites));
            })();
            chrome.runtime.onMessage.addListener((request, sender, sendRespond) => {
                if (request.UPDATE_SETTINGS) {
                    dispatch(updateBlockList(Settings.blockSites));
                }
            });
        }
    }, [dispatch]);

    return (
        <Provider store={store}>
            <Layout>
                <Flex width="300px" flexDirection="column">
                    <Typo name="title_242018_nv90_500">Stay FOCUS</Typo>
                    <Split my="8px" horizontal length="100%" />
                    <Flex flexDirection="column" style={{ marginTop: "4px" }}>
                        <BlockList />
                        <NewItem />
                    </Flex>
                </Flex>
            </Layout>
        </Provider>
    );
};

export default App;
