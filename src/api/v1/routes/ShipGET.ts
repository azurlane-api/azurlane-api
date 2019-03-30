import cheerio from "cheerio";
import axios, { AxiosResponse } from "axios";
import { Router, Request, Response } from "express";
import { Controller, Settings } from "../../../utils/Interfaces";
import { capitalize } from "../../../utils/Helpers";

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
                message: "The request cannot be fulfilled due to it missing a name query param."
            });
        }

        name = name.replace(/ /gui, "_");
        name = name.split("_").map((str: string) => capitalize(str)).join("_");

        let response: AxiosResponse;
        try {
            response = await axios.get(`${this.settings.baseUrl}/${name}`);
        } catch (e) {
            return res.status(400).json({
                statusCode: 400,
                statusMessage: "Bad Request",
                message: "The request cannot be fulfilled due to bad syntax."
            });
        }

        try {
            const $ = cheerio.load(response.data);
            const image = this.settings.baseUrl + $(".image img")[0].attribs.src;
            const shipdata = $("tbody tr td");
            const shipname = $(".mw-parser-output span")[0].children[0].data;
            const names = { full: "", en: "", cn: "", jp: "" };

            const list = $("#tabber-65a9e89be3346823405cb28f78263f1d .tabbertab");
            const skins = [];
            for (let i = 0; i < list.length; i++) {
                const child = list[i].children.find((c) => c.attribs ? c.attribs.class ? c.attribs.class.indexOf("adaptiveratioimg") !== -1 : false : false);
                skins.push({
                    title: list[i].attribs.title,
                    image: child ? this.settings.baseUrl + child.children[0].children[0].attribs.src : null
                });
            }

            if (shipname) {
                names.full = shipname;
                names.en = shipname.replace(/ \([a-z]{2}: \D+; [a-z]{2}: \D+\)/gui, "");

                const tempCN = shipname.match(/\(cn: \D+;/gui) || []
                if (tempCN.length >= 1) {
                    names.cn = tempCN[0].replace(/^\(cn: /gui, "").replace(/;$/gui, "");
                }

                const tempJP = shipname.match(/jp: \D+\)/gui) || []
                if (tempJP.length >= 1) {
                    names.jp = tempJP[0].replace(/^jp: /gui, "").replace(/\)$/gui, "");
                }
            }

            let buildTime = shipdata[0].children[1].children[0].data;
            if (buildTime && buildTime.charAt(buildTime.length - 1) === "(")
                buildTime = buildTime.slice(0, -1);

            const stars = shipdata[1].children[1].data; // .next
            const shipClass = shipdata[2].children[0].children[0].data;
            const shipID = shipdata[3].children[0].data;
            const nationality = shipdata[4].children[2].children[0].data; // .next.next
            const hullType = shipdata[5].children[3].children[0].data; // .next.next.next

            // Check which rarity it is and use the appropriate string
            let rarity = "";
            const str = $("tbody tr td")[1].children[0].attribs.src.toLowerCase();
            if (str.indexOf("normal") !== -1)
                rarity = "Common";
            else if (str.indexOf("elite") !== -1)
                rarity = "Elite";
            else if (str.indexOf("superrare") !== -1)
                rarity = "Super Rare";
            else if (str.indexOf("rare") !== -1)
                rarity = "Rare";
            else if (str.indexOf("legendary") !== -1)
                rarity = "Legendary";

            return res.status(200).json({
                statusCode: 200,
                statusMessage: "OK",
                message: "The request was successful",
                ship: {
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
                    class: shipClass,
                    nationality: nationality,
                    hullType: hullType
                }
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                statusMessage: "Internal Server Error",
                message: "The server encountered an unexpected condition that prevented it from fulfilling the request.",
                error: error.toString()
            });
        }
    }
}