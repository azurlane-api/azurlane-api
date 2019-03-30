import { Router } from "express";

export interface Settings {
    version: string;
    port: number;
    env: string;
    baseUrl: string;
}

export interface Controller {
    router: Router;
    settings: Settings;
}
