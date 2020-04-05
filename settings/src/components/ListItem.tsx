import React from "react";
import { Button, Flex, Icon, Input, Typo, theme } from "@salesboost/malta";

interface ListItemProps {
    url: string;
    site: string;
}

export const ListItem = ({ site, url }: ListItemProps) => (
    <Flex alignItems="center" style={{ padding: "8px 4px" }}>
        <Typo name="body_181818_nv90_500">{site}</Typo>
        <Typo name="caption_121212_nv40_300" ml="6px">{url}</Typo>
    </Flex>
);

export const NewItem = () => {
    const [url, setUrl] = React.useState<string>("");
    const [site, setSite] = React.useState<string>("");
    const [active, setActive] = React.useState<boolean>(false);

    const onNewItemClick = React.useCallback(() => {
        const nextState = !active;
        if (nextState) {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                setUrl(tabs[0].url || "");
                setSite(tabs[0].title || "");
            })
        }
        setActive(nextState);
    }, [active, setActive, site, url]);
    return (
        <Flex flexDirection="column">
            <Flex alignItems="center" onClick={onNewItemClick} cursor="pointer">
                {active ? <>
                    <Icon name="close" size={12} color={theme.colors.blue._80} mr="4px" />
                    <Typo name="body_161616_nv80_500" color={theme.colors.blue._80} ml="4px">취소</Typo>
                </> : <>
                    <Icon name="add" size={12} color={theme.colors.blue._80} mr="4px" />
                    <Typo name="body_161616_nv80_500" color={theme.colors.blue._80} ml="4px">현재 사이트 추가</Typo>
                </>}
            </Flex>
            {active ? (
                <Flex flexDirection="column" style={{ marginTop: "4px" }}>
                    <Flex alignItems="center">
                        <Typo name="body_141414_nv60_300">이름</Typo>
                        <Input ml="8px" flex={1} value={site} />
                    </Flex>
                    <Flex alignItems="center" style={{ marginTop: "8px" }}>
                        <Typo name="body_141414_nv60_300">URL</Typo>
                        <Input ml="8px" flex={1} value={url} />
                    </Flex>
                    <Button
                        label="추가" />
                </Flex>
            ) : null}
        </Flex>
    );
};
