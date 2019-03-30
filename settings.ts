import { version } from "./package.json";
import { Settings } from "./src/utils/Interfaces";

const settings: Settings = {
    version: version,
    port: 80,
    env: process.env.NODE_ENV || "development"
}

export default settings;
