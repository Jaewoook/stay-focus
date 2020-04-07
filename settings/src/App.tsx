import React from 'react';
import { Flex, Icon, Split, Typo } from "@salesboost/malta";
import { Layout, NewItem, ListItem } from "./components";
import { Settings, SiteInfo } from "./utils";

const App = () => {
    const [blockList, setBlockList] = React.useState<SiteInfo[]>([]);
    React.useEffect(() => {
        setBlockList(Settings.blockSites || []);
        chrome.runtime.onMessage.addListener((request, sender, sendRespond) => {
            if (request.UPDATE_SETTINGS) {
                setBlockList(Settings.blockSites || []);
            }
        });
    }, []);
    return (
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
    );
};

export default App;
