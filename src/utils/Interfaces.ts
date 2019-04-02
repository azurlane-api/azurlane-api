import { Router } from "express";

export interface Settings {
    version: string;
    env: string;
    baseUrl: string;
}

export interface Controller {
    router: Router;
    settings: Settings;
}

export interface ConstructionData {
    time: string;
    ships: string[];
}

export interface Names {
    full: string | null;
    en: string | null;
    cn: string | null;
    jp: string | null;
}

export interface Skins {
    title: string | null;
    image: string | null;
}