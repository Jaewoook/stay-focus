type SiteInfo = {
    title: string;
    url: string;
};

class Settings {
    blockSites: SiteInfo[] = [];

    loadSettings() {
        return new Promise<void>((resolve, reject) => {
            chrome.storage.sync.get("block_list", (settings) => {
                this.blockSites = settings.block_list || [];

                //  code for debugging
                console.log("Settings loaded!");
                console.log(this.blockSites);

                // const mock: SiteInfo[] = [{
                //     title: "트위치",
                //     url: "https://www.twitch.tv/",
                // }];
                // this.blockSites = mock;
                // console.log("mock: ", this.blockSites);

                resolve();
            });

        });
    }
}

(async function() {
    const settings = new Settings();
    await settings.loadSettings();

    const active = settings.blockSites
                        .map((info) => info.url)
                        .some((url) => window.location.href.startsWith(url));

    if (active) {
        console.log("Block site");
        const container = document.createElement("div");
        container.style.width = "100vw";
        container.style.height = "100vh";
        const image = new Image();
        image.src = chrome.runtime.getURL("build/extension/images/fallback.png");
        image.style.width = "70%";
        image.style.margin = "0 15%";
        document.body.innerHTML = "";
        container.appendChild(image);
        document.body.appendChild(container);
    }
})();
