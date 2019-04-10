import express from "express";
import path from "path";
import { promises as fs } from "fs";
import { Settings, APIOptions } from "../../utils/Interfaces";
import Logger from "../../utils/Logger";

export default class APIv1 {
    public router: express.Router;
    public routes: Map<string, any>;
    public path: string;
    public settings: Settings;
    public logger: Logger;

    public constructor(options: APIOptions) {
        this.router = express.Router();
        this.routes = new Map();
        this.path = "/v1";
        this.settings = options.settings;
        this.logger = options.logger;

        this.router.get("/", (_req, res) => {
            res.render("index");
        });
    }

    public async loadRoutes(): Promise<void> {
        const files = await fs.readdir(path.join(__dirname, "/routes/"));

        for (const file of files) {
            if (file.endsWith(".ts") || file.endsWith(".js")) {
                const temp = await import(path.join(__dirname, "/routes/", file));
                const route = new temp.default({ router: this.router, settings: this.settings, logger: this.logger });
                
                this.logger.info("LOAD", `Connected route: ${this.path}${route.path}`);
                this.routes.set(route.path, route);
            }
        }
    }
}