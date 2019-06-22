import cheerio from "cheerio";
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { Router, Request, Response } from "express";
import { Controller, Settings, Names, Skin } from "../../../utils/Interfaces";
import { capitalize, skipCapitalization, nations } from "../../../utils/Helpers";

export default class ShipGET {
    public path: string;
    public router: Router;
    public settings: Settings;

    public constructor(controller: Controller) {
        this.path = "/ship";
        this.router = controller.router;
        this.settings = controller.settings;

        this.router.get(this.path, this.run.bind(this));
    }

    public async run(req: Request, res: Response): Promise<Response> {
        let name: string = req.query.name;
        if (!name) {
            return res.status(400).json({
                statusCode: 400,
                statusMessage: "Bad Request",
                message: "Missing a name query param."
            });
        }

        name = name.toLowerCase()
            .replace(/ /gui, "_")
            .split("_")
            .map((str) => skipCapitalization.includes(str) ? str : capitalize(str))
            .join("_");

        if (name.startsWith("Jeanne")) {
            name = "Jeanne d'Arc";
        }

        // eslint-disable-next-line init-declarations
        let response: AxiosResponse;
        try {
            const reqConfig: AxiosRequestConfig = { headers: { "User-Agent": this.settings.userAgent } }
            response = await axios.get(`${this.settings.baseUrl}/${name}`, reqConfig);
        } catch (e) {
            return res.status(400).json({
                statusCode: 400,
                statusMessage: "Bad Request",
                message: "Invalid ship name."
            });
        }

        try {
            const $ = cheerio.load(response.data);
            const image = this.settings.baseUrl + $(".image img")[0].attribs.src;
            const shipdata = $("tbody tr td");
            let nationalityShort = $(".mw-parser-output .nomobile div div")[0].children[0].data;
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

            const list = $("div[id^=\"tabber-\"] .tabbertab");
            const skins: Skin[] = [];
            for (let i = 0; i < list.length; i++) {
                const child = list[i].children.find((c): boolean => c.attribs ? c.attribs.class ? c.attribs.class.indexOf("adaptiveratioimg") !== -1 : false : false);
                if (child) {
                    skins.push({
                        title: list[i].attribs.title,
                        image: this.settings.baseUrl + child.children[0].children[0].attribs.src
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

            return res.status(200).json({
                statusCode: 200,
                statusMessage: "OK",
                message: "The request was successful",
                ship: {
                    wikiUrl: `${this.settings.baseUrl}/${names.en ? names.en.replace(" ", "_") : ""}`,
                    id: shipID ? shipID.trim() : null,
                    names: names,
                    thumbnail: image,
                    skins: skins,
                    buildTime: buildTime ? buildTime.trim() : null,
                    rarity: rarity,
                    stars: {
                        value: stars ? stars.trim() : null,
                        count: stars ? (stars.match(/★/gui) || []).length : 0
                    },
                    class: shipClass ? shipClass.trim() : null,
                    nationality: nationality ? nationality.trim() : null,
                    nationalityShort: nationalityShort ? nationalityShort.trim() : null,
                    hullType: hullType ? hullType.trim() : null
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
