import { version } from "./package.json";
import { Settings } from "./src/utils/Interfaces";

const settings: Settings = {
    version: version,
    env: process.env.NODE_ENV || "development",
    baseUrl: "https://azurlane.koumakan.jp",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:64.0) Gecko/20100101 Firefox/64.0",
}

export default settings;
