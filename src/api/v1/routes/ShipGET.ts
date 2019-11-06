import cheerio from "cheerio";
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { Request, Response } from "express";
import { Controller, Names, Skin, Miscellaneous, Stats, StatsItem } from "../../../utils/Interfaces";
import { capitalize, skipCapitalization, nations, capitalizeAll } from "../../../utils/Helpers";
import BaseRoute from "../BaseRoute";

export default class ShipGET extends BaseRoute {

    public constructor(controller: Controller) {
        super({ path: "/ship", controller });
        this.router.get(this.path, this.run.bind(this));
    }

    public async run(req: Request, res: Response): Promise<Response> {
        const reqConfig: AxiosRequestConfig = { headers: { "User-Agent": this.settings.userAgent } }
        let name: string = req.query.name;
        if (!name) {
            let id: string = req.query.id;
            if (!id) {
                return res.status(400).json({
                    statusCode: 400,
                    statusMessage: "Bad Request",
                    message: "Missing a name/id query param."
                });
            }

            id = capitalize(id);

            try {
                const resp = await axios.get("https://azurlane.koumakan.jp/List_of_Ships", reqConfig);
                const $ = cheerio.load(resp.data);
                const ship = $(`td[data-sort-value="${id}"]`)[0];
                if (ship) {
                    name = ship.firstChild.attribs.title;
                } else {
                    return res.status(400).json({
                        statusCode: 400,
                        statusMessage: "Bad Request",
                        message: "Invalid ship id."
                    });
                }
            } catch (e) {
                if (e.response) {
                    return res.status(e.response.status).json({
                        statusCode: e.response.status,
                        statusMessage: e.response.statusText,
                        message: "Failed to get info from https://azurlane.koumakan.jp/"
                    });
                } else {
                    return res.status(400).json({
                        statusCode: 400,
                        statusMessage: "Bad Request",
                        message: "Failed to get info from https://azurlane.koumakan.jp/"
                    });
                }
            }
        }

        name = name.toLowerCase()
            .replace(/ /gui, "_")
            .split("_")
            .map((str) => skipCapitalization.includes(str) ? str : capitalize(str))
            .map((str) => capitalizeAll.includes(str) ? str.toUpperCase() : str)
            .join("_");

        if (name.startsWith("Jeanne")) {
            name = "Jeanne d'Arc";
        }

        // eslint-disable-next-line init-declarations
        let response: AxiosResponse;
        try {
            response = await axios.get(`${this.settings.baseUrl}/${name}`, reqConfig);
        } catch (e) {
            if (e.response) {
                return res.status(e.response.status).json({
                    statusCode: e.response.status,
                    statusMessage: e.response.statusText,
                    message: "Failed to get info from https://azurlane.koumakan.jp/"
                });
            } else {
                return res.status(400).json({
                    statusCode: 400,
                    statusMessage: "Bad Request",
                    message: "Invalid ship name."
                });
            }
        }

        try {
            const $ = cheerio.load(response.data);
            const image = this.settings.baseUrl + $(".image img")[0].attribs.src;
            const shipdata = $("tbody tr td");
            const shipname = $("div[style='border-style:solid; border-width:1px 1px 0px 1px; border-color:#a2a9b1; width:100%; background-color:#eaecf0; text-align:center; font-weight:bold']");
            let nationalityShort = shipname ? shipname[0].children[0].data : null;
            if (nationalityShort) {
                for (let i = 0; i < nations.length; i++) {
                    if (nationalityShort.includes(nations[i])) {
                        nationalityShort = nationalityShort.substring(0, nations[i].length);
                    }
                }
            }

            const names: Names = {
                en: $(".azl_box_title")[0] ? $(".azl_box_title")[0].children[0].data || null : null,
                cn: $("span[lang='zh']")[0] ? $("span[lang='zh']")[0].children[0].data || null : null,
                jp: $("span[lang='ja']")[0] ? $("span[lang='ja']")[0].children[0].data || null : null,
                kr: $("span[lang='ko']")[0] ? $("span[lang='ko']")[0].children[0].data || null : null
            };

            const chibis = $("img[alt*='Chibi']");
            const list = $("div[id^=\"tabber-\"] .tabbertab");
            const skins: Skin[] = [];
            for (let i = 0; i < list.length; i++) {
                const child = list[i].children.find((c): boolean => c.attribs ? c.attribs.class ? c.attribs.class.indexOf("adaptiveratioimg") !== -1 : false : false);
                if (child) {
                    let skinChibi = null;
                    const chibi = chibis[i] ? chibis[i].attribs.src.split("/") : null;
                    if (!chibi) {
                        skinChibi = null;
                    } else {
                        chibi.pop();
                        skinChibi = this.settings.baseUrl + chibi.join("/").replace("/thumb", "");
                    }

                    skins.push({
                        title: list[i].attribs.title,
                        image: this.settings.baseUrl + child.children[0].children[0].attribs.src,
                        chibi: skinChibi
                    });
                }
            }

            let buildTime = shipdata[0].children[0].children ? shipdata[0].children[0].children[0].data : null;
            if (buildTime && buildTime.charAt(buildTime.length - 1) === "(")
                buildTime = buildTime.slice(0, -1);

            const stars = shipdata[1].children[1].data;
            const shipClass = shipdata[2].children[0].children[0].data;
            const shipID = shipdata[3].children[0].data;
            const nationality = shipdata[4].children[2].children[0].data;
            const hullType = shipdata[5].children[2].children[0].data;

            // Check which rarity it is and use the appropriate string
            let rarity = "";
            const str = $("tbody tr td")[1].children[0].attribs.title.toLowerCase();
            switch (str) {
                case "normal":
                    rarity = "Common";
                    break;
                case "rare":
                    rarity = "Rare";
                    break;
                case "elite":
                    rarity = "Elite";
                    break;
                case "super rare":
                    rarity = "Super Rare";
                    break;
                case "legendary":
                    rarity = "Legendary";
                    break;
                case "ultra rare":
                    rarity = "Ultra Rare";
                    break;
                case "priority":
                    rarity = "Priority";
                    break;
                case "decisive":
                    rarity = "Decisive";
                    break;
                case "unreleased":
                    rarity = "Unreleased"
                    break;
                default:
                    rarity = "Unkown"
                    break;
            }

            const stats: Stats = {};

            const baseStats: StatsItem[] = [];
            const bsElement = $("div[title='Base Stats'] table tbody")[0];
            const bsFiltered = bsElement.children.filter((el) => el.type === "tag" && el.name === "tr");
            bsFiltered.forEach((el) => {
                const tds = el.children.filter((e) => e.type === "tag" && e.name === "td");
                const ths = el.children.filter((e) => e.type === "tag" && e.name === "th");
                for (let i = 0; i < tds.length; i++) {
                    const value = tds[i].children[0].data ? tds[i].children[0].data!.replace("\n", "") : null
                    const name = ths[i].children[0].attribs.alt ? ths[i].children[0].attribs.alt : ths[i].children[0].attribs.title || null;
                    const image = ths[i].children[0].attribs.src ? `${this.settings.baseUrl}${ths[i].children[0].attribs.src}` : null;
                    baseStats.push({ name, image, value });
                }
            });
            stats.base = baseStats;

            const hundredStats: StatsItem[] = [];
            const hElement = $("div[title='Level 100'] table tbody")[0];
            const hFiltered = hElement.children.filter((el) => el.type === "tag" && el.name === "tr");
            hFiltered.forEach((el) => {
                const tds = el.children.filter((e) => e.type === "tag" && e.name === "td");
                const ths = el.children.filter((e) => e.type === "tag" && e.name === "th");
                for (let i = 0; i < tds.length; i++) {
                    const value = tds[i].children[0].data ? tds[i].children[0].data!.replace("\n", "") : null
                    const name = ths[i].children[0].attribs.alt ? ths[i].children[0].attribs.alt : ths[i].children[0].attribs.title || null;
                    const image = ths[i].children[0].attribs.src ? `${this.settings.baseUrl}${ths[i].children[0].attribs.src}` : null;
                    hundredStats.push({ name, image, value });
                }
            });
            stats[100] = hundredStats;

            const hundredRetrofitStats: StatsItem[] = [];
            const hrElement = $("div[title='Level 100 Retrofit'] table tbody")[0];
            const hrFiltered = hrElement && hrElement.children ? hrElement.children.filter((el) => el.type === "tag" && el.name === "tr") : [];
            hrFiltered.forEach((el) => {
                const tds = el.children.filter((e) => e.type === "tag" && e.name === "td");
                const ths = el.children.filter((e) => e.type === "tag" && e.name === "th");
                for (let i = 0; i < tds.length; i++) {
                    const value = tds[i].children[0].data ? tds[i].children[0].data!.replace("\n", "") : null
                    const name = ths[i].children[0].attribs.alt ? ths[i].children[0].attribs.alt : ths[i].children[0].attribs.title || null;
                    const image = ths[i].children[0].attribs.src ? `${this.settings.baseUrl}${ths[i].children[0].attribs.src}` : null;
                    hundredRetrofitStats.push({ name, image, value });
                }
            });
            stats.retrofit100 = hrElement && hrElement.children ? hundredRetrofitStats : null;

            const hundredtwentyStats: StatsItem[] = [];
            const htElement = $("div[title='Level 120'] table tbody")[0];
            const htFiltered = htElement.children.filter((el) => el.type === "tag" && el.name === "tr");
            htFiltered.forEach((el) => {
                const tds = el.children.filter((e) => e.type === "tag" && e.name === "td");
                const ths = el.children.filter((e) => e.type === "tag" && e.name === "th");
                for (let i = 0; i < tds.length; i++) {
                    const value = tds[i].children[0].data ? tds[i].children[0].data!.replace("\n", "") : null
                    const name = ths[i].children[0].attribs.alt ? ths[i].children[0].attribs.alt : ths[i].children[0].attribs.title || null;
                    const image = ths[i].children[0].attribs.src ? `${this.settings.baseUrl}${ths[i].children[0].attribs.src}` : null;
                    hundredtwentyStats.push({ name, image, value });
                }
            });
            stats[120] = hundredtwentyStats;

            const hundredtwentyRetrofitStats: StatsItem[] = [];
            const htrElement = $("div[title='Level 120 Retrofit'] table tbody")[0];
            const htrFiltered = htrElement && htrElement.children ? htrElement.children.filter((el) => el.type === "tag" && el.name === "tr") : [];
            htrFiltered.forEach((el) => {
                const tds = el.children.filter((e) => e.type === "tag" && e.name === "td");
                const ths = el.children.filter((e) => e.type === "tag" && e.name === "th");
                for (let i = 0; i < tds.length; i++) {
                    const value = tds[i].children[0].data ? tds[i].children[0].data!.replace("\n", "") : null
                    const name = ths[i].children[0].attribs.alt ? ths[i].children[0].attribs.alt : ths[i].children[0].attribs.title || null;
                    const image = ths[i].children[0].attribs.src ? `${this.settings.baseUrl}${ths[i].children[0].attribs.src}` : null;
                    hundredtwentyRetrofitStats.push({ name, image, value });
                }
            });
            stats.retrofit120 = hundredtwentyRetrofitStats.length >= 1 ? hundredtwentyRetrofitStats : null;

            const miscellaneous: Miscellaneous = {};
            const mList = $(".wikitable[style='color:black; background-color:#f8f9fa; width:100%'] tbody")[0];
            const mFiltered = mList.children.filter((i) => i.type === "tag" && i.name === "tr");
            mFiltered.forEach((i) => {
                const children = i.children.filter((o) => o.type === "tag" && o.name === "td");
                if (children.length >= 2) {
                    const title = children?.[0]?.children?.[0]?.data?.replace("\n", "")
                    const link = children?.[1]?.children?.[0]?.attribs?.href?.startsWith("/Artists") ? `${this.settings.baseUrl}${children?.[1]?.children?.[0]?.attribs?.href ?? ""}` : children?.[1]?.children?.[0]?.attribs?.href ?? null;
                    const name = children?.[1]?.children?.[0]?.children?.[0]?.data ?? null;

                    switch (title) {
                        case "Artist": {
                            miscellaneous.artist = { link, name };
                            break;
                        }
                        case "Web": {
                            miscellaneous.web = { link, name };
                            break;
                        }
                        case "Pixiv": {
                            miscellaneous.pixiv = { link, name };
                            break;
                        }
                        case "Twitter": {
                            miscellaneous.twitter = { link, name };
                            break;
                        }
                        case "Voice Actress": {
                            let actress = $("a.extiw")[0];
                            if (shipID && (shipID.trim() === "236" || shipID.trim() === "101")) actress = $(".external.text[rel='nofollow']")[3];
                            miscellaneous.voiceActress = { link: actress?.attribs?.href ?? null, name: actress?.children?.[0]?.data ?? null };
                            break;
                        }
                    }
                }
            });

            return res.status(200).json({
                statusCode: 200,
                statusMessage: "OK",
                message: "The request was successful",
                ship: {
                    wikiUrl: `${this.settings.baseUrl}/${names.en?.replace(/ /gu, "_") ?? ""}`,
                    id: shipID?.trim() ?? null,
                    names: names,
                    thumbnail: image,
                    skins: skins,
                    buildTime: buildTime?.trim() ?? null,
                    rarity: rarity,
                    stars: {
                        value: stars?.trim() ?? null,
                        count: (stars?.match(/★/gui) ?? []).length
                    },
                    class: shipClass?.trim() ?? null,
                    nationality: nationality?.trim() ?? null,
                    nationalityShort: nationalityShort?.trim() ?? null,
                    hullType: hullType?.trim() ?? null,
                    stats: stats,
                    miscellaneous: miscellaneous
                }
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                statusCode: 500,
                statusMessage: "Internal Server Error",
                message: "The server encountered an unexpected condition that prevented it from fulfilling the request.",
                error: error.toString()
            });
        }
    }
}
