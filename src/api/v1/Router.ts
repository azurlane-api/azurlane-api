import express from "express";
import path from "path";
import Collection from "@kurozero/collection";
import Logger from "../../utils/Logger";
import BaseRoute from "./BaseRoute";
import { promises as fs } from "fs";
import { Settings, APIOptions } from "../../utils/Interfaces";

export default class APIv1 {
    public router: express.Router;
    public routes: Collection<BaseRoute>;
    public path: string;
    public settings: Settings;
    public logger: Logger;

    public constructor(options: APIOptions) {
        this.router = express.Router();
        this.routes = new Collection(BaseRoute);
        this.path = "/v1";
        this.settings = options.settings;
        this.logger = options.logger;

        this.router.get("/", (_req, res) => {
            res.status(200).json({
                statusCode: 200,
                statusMessage: "OK",
                message: "The request was successful",
                routes: this.routes.map((route) => `${route.path}`)
            });
        });
    }

    public async loadRoutes(): Promise<void> {
        const files = await fs.readdir(path.join(__dirname, "/routes/"));

        for (const file of files) {
            if (file.endsWith(".ts") || file.endsWith(".js")) {
                const temp = await import(path.join(__dirname, "/routes/", file));
                const route: BaseRoute = new temp.default({ router: this.router, settings: this.settings, logger: this.logger });
                
                this.logger.info("LOAD", `Connected route: ${this.path}${route.path}`);
                this.routes.add(route);
            }
        }
    }
}