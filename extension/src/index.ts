type SiteInfo = {
    title: string;
    url: string;
};

class Settings {
    blockSites: SiteInfo[] = [];

    constructor() {
        this.loadSettings();
    }

    loadSettings() {
        // chrome.storage.sync.get("block_list", (settings) => {
        //     this.blockSites = settings.block_list as SiteInfo[];

        //     //  for debugging
        //     console.log("Settings loaded!");
        //     console.log(this.blockSites);
        // });
        const mock: SiteInfo[] = [{
            title: "트위치",
            url: "https://www.twitch.tv/",
        }];
        this.blockSites = mock;
        console.log("mock: ", this.blockSites);
    }
}

const settings = new Settings();

console.log("href: ", window.location.href);
let active = false;

console.log(settings.blockSites.length);
settings.blockSites.map((info) => info.url).forEach((url) => {
        console.log(active, window.location.href.startsWith(url));
        if (!active) {
            active = window.location.href.startsWith(url);
        }
    }
);
if (active) {
    console.log("filter site");
    document.body.innerHTML = "<h1>It Works!</h1>";
}
