import React from "react";
import { Block, Button, Flex, Icon, Input, Typo, theme } from "@salesboost/malta";

import { useDispatch } from "react-redux";
import { updateBlockList } from "../redux/actions";
import { Settings } from "../utils";

interface ListItemProps {
    url: string;
    site: string;
    onRemoveClick: (site: string, url: string) => void;
}

export const ListItem = ({ site, url, onRemoveClick }: ListItemProps) => {
    return (
        <Flex width="100%" alignItems="center" style={{ padding: "8px 4px" }}>
            <Flex flex={1} alignItems="baseline">
                <Typo maxWidth="100px" name="body_181818_nv90_500"
                    style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{site}</Typo>
                <Typo maxWidth="175px" name="caption_121212_nv40_300"
                    style={{ marginLeft: "6px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{url}</Typo>
            </Flex>
            <Block cursor="pointer" onClick={() => onRemoveClick(site, url)}>
                <Icon name="close" size={12} color={theme.colors.navy._40} />
            </Block>
        </Flex>
    );
};

export const NewItem = () => {
    const dispatch = useDispatch();
    const [url, setUrl] = React.useState<string>("");
    const [site, setSite] = React.useState<string>("");
    const [active, setActive] = React.useState<boolean>(false);
    const isAlreadyExists = React.useMemo(() => Settings.blockSites.includes({ title: site, url }), [site, url]);

    const onNewItemClick = React.useCallback(() => {
        const nextState = !active;
        if (nextState) {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                setUrl(tabs[0].url || "");
                setSite(tabs[0].title || "");
            })
        }
        setActive(nextState);
    }, [active, setActive]);

    const handleAddClick = React.useCallback(async () => {
        await Settings.addBlockSite(site, url);
        console.log("add block site info", Settings.blockSites);
        dispatch(updateBlockList(Settings.blockSites));
        setSite("");
        setUrl("");
        setActive(false);
    }, [dispatch, site, url, setSite, setUrl, setActive]);
    return (
        <Flex flexDirection="column">
            {active ? (
                <Flex style={{ marginLeft: "auto" }} alignItems="center" onClick={onNewItemClick} cursor="pointer">
                    <Icon name="close" size={12} color="rgba(57, 67, 226, 0.6)" mr="4px" />
                    <Typo name="body_161616_nv80_500" color="rgba(57, 67, 226, 0.6)" ml="4px">취소</Typo>
                </Flex>
            ) : (
                <Flex style={{ margin: "0 auto" }} alignItems="center" onClick={onNewItemClick} cursor="pointer">
                    <Icon name="add" size={12} color="rgba(57, 67, 226, 0.6)" mr="4px" />
                    <Typo name="body_161616_nv80_500" color="rgba(57, 67, 226, 0.6)" ml="4px">현재 사이트 추가</Typo>
                </Flex>
            )}
            {active ? (
                <Flex flexDirection="column" style={{ marginTop: "4px" }}>
                    <Flex alignItems="center">
                        <Typo name="caption_141212_nv80_500">이름</Typo>
                        <Input ml="8px" flex={1}
                            onTextChange={(text) => setSite(text)}
                            placeholder="YouTube"
                            value={site} />
                    </Flex>
                    <Flex alignItems="center" style={{ marginTop: "8px" }}>
                        <Typo name="caption_141212_nv80_500">URL</Typo>
                        <Input ml="8px" flex={1}
                            onTextChange={(text) => setUrl(text)}
                            placeholder="youtube.com"
                            value={url} />
                    </Flex>
                    <Button
                        mt={3} height="40px" fontSize="12px"
                        disabled={isAlreadyExists || !site || !url}
                        onClick={handleAddClick}
                        label="추가" />
                </Flex>
            ) : null}
        </Flex>
    );
};
