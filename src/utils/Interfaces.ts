import { Router } from "express";
import Logger from "./Logger";

export interface Settings {
    version: string;
    env: string;
    baseUrl: string;
    userAgent: string;
}

export interface APIOptions {
    settings: Settings,
    logger: Logger
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
    en: string | null;
    cn: string | null;
    jp: string | null;
    kr: string | null;
}

export interface Skin {
    title: string | null;
    image: string | null;
    chibi: string | null;
}

export interface StatsItem {
    name: string | null;
    image: string | null;
    value: string | null;
}

export interface Stats {
    base?: StatsItem[];
    100?: StatsItem[];
    120?: StatsItem[];
    retrofit100?: StatsItem[] | null;
    retrofit120?: StatsItem[] | null;
}

export interface MiscellaneousData {
    link: string | null;
    name: string | null;
}

export interface Miscellaneous {
    artist?: MiscellaneousData;
    web?: MiscellaneousData;
    pixiv?: MiscellaneousData;
    twitter?: MiscellaneousData;
    voiceActress?: MiscellaneousData;
}