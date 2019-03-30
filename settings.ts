import { version } from "./package.json";
import { Settings } from "./src/utils/Interfaces";

const settings: Settings = {
    version: version,
    port: 3000,
    env: process.env.NODE_ENV || "development",
    baseUrl: "https://azurlane.koumakan.jp"
}

export default settings;
