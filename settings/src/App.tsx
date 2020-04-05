import React from 'react';
import { Flex, Icon, Split, Typo } from "@salesboost/malta";
import { Layout, NewItem } from "./components";

const App = () => {
    return (
        <Layout>
            <Flex width="300px" flexDirection="column">
                <Typo name="title_242018_nv90_500">Stay FOCUS</Typo>
                <Split my="8px" horizontal length="100%" />
                <Flex flexDirection="column">
                    <NewItem />
                </Flex>
            </Flex>
        </Layout>
    );
};

export default App;
