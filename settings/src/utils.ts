export type SiteInfo = {
    title: string;
    url: string;
};
const SETTINGS_KEY_BLOCK_LIST = "block_list";

const Settings = {
    blockSites: ([] as SiteInfo[]),
    addBlockSite: (title: string, url: string) => {
        //  check is array duplicated
        if (Settings.blockSites.map((site) => site.title).indexOf(title) > -1) {
            return;
        }
        chrome.storage.sync.set({
            [SETTINGS_KEY_BLOCK_LIST]: [
                ...Settings.blockSites,
                {
                    title,
                    url,
                },
            ],
        }, () => Settings.loadSettings())
    },
    removeBlockSite: (title: string, url: string) => {
        chrome.storage.sync.set({
            [SETTINGS_KEY_BLOCK_LIST]: Settings.blockSites.filter((site) => site.title !== title && site.url !== url),
        }, () => Settings.loadSettings());
    },
    updateBlockSite: (title: string, url: string, newTitle?: string, newUrl?: string) => {
        const idx = Settings.blockSites.indexOf({ title, url });
        const newList = [...Settings.blockSites];
        newList[idx] = {
            title: newTitle || title,
            url: newUrl || url,
        };
        chrome.storage.sync.set({
            [SETTINGS_KEY_BLOCK_LIST]: newList,
        }, () => Settings.loadSettings());
    },
    loadSettings: () => {
        chrome.storage.sync.get(SETTINGS_KEY_BLOCK_LIST, (settings) => {
            console.log("loaded settings! ", settings);
            Settings.blockSites = (settings.block_list as SiteInfo[]) || [];
        });
    },
};
Settings.loadSettings();

export {
    Settings,
};
