export type SiteInfo = {
    title: string;
    url: string;
};
const SETTINGS_KEY_BLOCK_LIST = "block_list";

const Settings = {
    blockSites: ([] as SiteInfo[]),
    addBlockSite: (title: string, url: string) => {
        return new Promise((resolve, reject) => {
            //  check is array duplicated
            if (Settings.blockSites.map((site) => site.title).indexOf(title) > -1) {
                reject("Site that you've tried to add is already exists in list");
                return;
            }
            if (isExtension()) {
                chrome.storage.sync.set({
                    [SETTINGS_KEY_BLOCK_LIST]: [
                        ...Settings.blockSites,
                        { title, url },
                    ],
                }, async () => {
                    await Settings.loadSettings();
                    resolve();
                });
            } else {
                reject();
            }
        });
    },
    removeBlockSite: (title: string, url: string) => {
        return new Promise((resolve, reject) => {
            if (isExtension()) {
                chrome.storage.sync.set({
                    [SETTINGS_KEY_BLOCK_LIST]: Settings.blockSites.filter((site) => site.title !== title && site.url !== url),
                }, async () => {
                    await Settings.loadSettings();
                    resolve();
                });
            } else {
                reject();
            }
        });
    },
    updateBlockSite: (title: string, url: string, newTitle?: string, newUrl?: string) => {
        return new Promise((resolve, reject) => {
            const idx = Settings.blockSites.indexOf({ title, url });
            const newList = [...Settings.blockSites];
            newList[idx] = {
                title: newTitle || title,
                url: newUrl || url,
            };
            if (isExtension()) {
                chrome.storage.sync.set({
                    [SETTINGS_KEY_BLOCK_LIST]: newList,
                }, () => Settings.loadSettings());
            } else {
                reject();
            }
        });
    },
    loadSettings: () => {
        return new Promise((resolve, reject) => {
            if (isExtension()) {
                chrome.storage.sync.get(SETTINGS_KEY_BLOCK_LIST, (settings) => {
                    console.log("loaded settings! ", settings);
                    Settings.blockSites = (settings.block_list as SiteInfo[]) || [];
                    resolve();
                });
            } else {
                reject();
            }
        });
    },
};

export const isExtension = () => {
    return !!(window?.chrome?.runtime?.id);
};

Settings.loadSettings();

export {
    Settings,
};
