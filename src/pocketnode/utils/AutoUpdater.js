const fs = require("fs");
const axios = require("axios");
const AdmZip = require('adm-zip');
const VersionCompare = pocketnode("utils/methods/VersionCompare");

class AutoUpdater {

    constructor(server, auto = false){
        this.url = "https://api.github.com/repos/TwistedAsylumMC/PocketNode/releases";
        // Possible config ^
        this.auto = auto
        this.opts = {
            headers: {
              'User-Agent': 'PocketNode A software written for Minecraft Bedrock Edition, written in NodeJS'
            }
        };
        this.server = server
        this.version = server.getPocketNodeVersion()
    }

    start(){
        this.getLatestData();
    }

    installUpdate(path){
        try{
            this.server.getLogger().debug("Extracting update...");
            var zip = new AdmZip(path);
            zip.extractAllTo("./", true);
            this.server.getLogger().debug("Extraction complete, deleting update zip");

            var tempFile = fs.openSync(path, 'r');  //To stop bugs on windows
            fs.closeSync(tempFile);

            fs.unlinkSync(path);  //Deletes update

            this.server.getLogger().warning("Nice, your server software was updated.");
            process.exit(0);
        } catch(err) {
            this.server.getLogger().error(err);
            return
        }
    }

    async downloadUpdate(data){
        try{
            this.server.getLogger().info("Downloading the latest update.");
            this.server.getLogger().debug("Downloading update from: "+data.assets[0].browser_download_url);
            let download = await axios.get(
                data.assets[0].browser_download_url,
                {headers:{'User-Agent': 'PocketNode A software written for Minecraft Bedrock Edition, written in NodeJS'}, responseType: 'arraybuffer'}
            );

            fs.writeFileSync(data.name+".zip", download.data)
            this.server.getLogger().debug("Download complete.");
            this.server.getLogger().warning("Server shutting down to install new update.");
            this.server.shutdown(false);
            this.installUpdate(data.name+".zip");
        } catch(err) {
            this.server.getLogger().error(err);
            return
        }
    }

    processUpdate(data){
        if(this.auto === false){
            this.server.getLogger().warning("----- UPDATE AVAILABLE -----");
            this.server.getLogger().warning(" Name    : "+data.name);
            this.server.getLogger().warning(" Version : "+data.tag_name);
            this.server.getLogger().warning(" URL     : "+data.html_url);
            this.server.getLogger().warning("----------------------------");
            return;
        }
        this.server.getLogger().warning("Server is updating your software !");
        this.downloadUpdate(data);
    }

    async getLatestData(){
        try{
            let data = await axios.get(this.url, this.opts);
            data = data.data[0]
            if(VersionCompare(this.version, data.tag_name) === -1){
                this.processUpdate(data);
                return;
            } else {
                this.server.getLogger().debug("Server is up to date.");
                return;
            }
        } catch(err) {
            this.server.getLogger().error(err);
        }
    }
}

module.exports = AutoUpdater;