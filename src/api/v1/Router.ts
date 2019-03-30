import express from "express";
import path from "path";
import { promises as fs } from "fs";
import { Settings } from "../../utils/Interfaces";

export default class APIv1 {
    public router: express.Router;
    public routes: Map<string, any>;
    public path: string;
    public settings: Settings;

    public constructor(settings: Settings) {
        this.router = express.Router();
        this.routes = new Map();
        this.path = "/v1";
        this.settings = settings;
    }

    public async loadRoutes(): Promise<void> {
        const files = await fs.readdir(path.join(__dirname, "/routes/"));

        for (const file of files) {
            if (file.endsWith(".ts") || file.endsWith(".js")) {
                const temp = await import(path.join(__dirname, "/routes/", file));
                const route = new temp.default(this, this.settings);
                
                console.info(`Connected route: ${this.path}${route.path}`);
                this.routes.set(route.path, route);
            }
        }
    }
}