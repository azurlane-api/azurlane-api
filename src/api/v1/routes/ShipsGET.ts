// $("td:contains('Super Rare')")
import cheerio from "cheerio";
import axios from "axios";
import BaseRoute from "../BaseRoute";
import { Request, Response } from "express";
import { Controller } from "../../../utils/Interfaces";
import { capitalize, rarities, types, affiliations } from "../../../utils/Helpers";

export enum Order {
    RARITY = "rarity",
    TYPE = "type",
    AFFILIATION = "affiliation"
}

export default class ShipsGET extends BaseRoute {
    public $?: CheerioStatic

    public constructor(controller: Controller) {
        super({ path: "/ships", controller });
        this.router.get(this.path, this.run.bind(this));
    }

    public async run(req: Request, res: Response): Promise<Response | undefined> {
        const orderBy: Order = req.query.orderBy;        
        if (!orderBy) {
            return res.status(400).json({
                statusCode: 400,
                statusMessage: "Bad Request",
                message: "Missing orderBy query param."
            });
        }

        try {
            const response = await axios.get("https://azurlane.koumakan.jp/List_of_Ships", { headers: { "User-Agent": this.settings.userAgent } });
            this.$ = cheerio.load(response.data);
        } catch (e) {
            if (e.response) {
                return res.status(e.response.status).json({
                    statusCode: e.response.status,
                    statusMessage: e.response.statusText,
                    message: "Failed to get info from https://azurlane.koumakan.jp/List_of_Ships"
                });
            } else {
                return res.status(400).json({
                    statusCode: 400,
                    statusMessage: "Bad Request",
                    message: "Failed to get info from https://azurlane.koumakan.jp/List_of_Ships"
                });
            }
        }

        switch (orderBy) {
            case Order.RARITY: 
                this.getShipsByRarity(req, res);
                break;
            case Order.TYPE:
                this.getShipsByType(req, res);
                break;
            case Order.AFFILIATION:
                this.getShipsByAffiliation(req, res);
                break;
            default:
                res.status(400).json({
                    statusCode: 400,
                    statusMessage: "Bad Request",
                    message: "Invalid orderBy param"
                });
                break;
        }
    }

    public getShipsByRarity(req: Request, res: Response): Response {
        if (this.$) {
            let rarity: string = req.query.rarity;
            if (!rarity) {
                return res.status(400).json({
                    statusCode: 400,
                    statusMessage: "Bad Request",
                    message: "Invalid rarity param"
                });
            }

            rarity = rarity.split(" ")
                .map((v) => capitalize(v))
                .join(" ");

            const isValid = rarities.includes(rarity);
            if (!isValid) {
                return res.status(400).json({
                    statusCode: 400,
                    statusMessage: "Bad Request",
                    message: `Invalid rarity "${rarity}"`
                });
            }

            const items = this.$(`td:contains("${rarity}")`);
            const values = Object.values(items).filter((v) => v.type === "tag" && v.name === "td");
            const ships: Record<string|number|symbol, string>[] = [];
            for (let i = 0; i < values.length; i++) {
                const parent = values[i].parent;
                const id = parent.children[0].attribs["data-sort-value"];
                const name = parent.children[1].children[0].attribs.title;
                ships.push({ id, name });
            }

            return res.status(200).json({
                statusCode: 200,
                statusMessage: "OK",
                message: "The request was successful",
                ships: ships
            });
        } else {
            return res.status(404).json({
                statusCode: 404,
                statusMessage: "Not Found",
                message: "Could not find what you were looking for"
            });
        }
    }

    public getShipsByType(req: Request, res: Response) {
        if (this.$) {
            let type: string = req.query.type;
            if (!type) {
                return res.status(400).json({
                    statusCode: 400,
                    statusMessage: "Bad Request",
                    message: "Invalid type param"
                });
            }

            type = type.split(" ")
                .map((v) => capitalize(v))
                .join(" ");

            const isValid = types.includes(type);
            if (!isValid) {
                return res.status(400).json({
                    statusCode: 400,
                    statusMessage: "Bad Request",
                    message: `Invalid type "${type}"`
                });
            }

            const items = this.$(`td:contains("${type}")`);
            const values = Object.values(items).filter((v) => v.type === "tag" && v.name === "td");
            const ships: Record<string|number|symbol, string>[] = [];
            for (let i = 0; i < values.length; i++) {
                const parent = values[i].parent;
                const id = parent.children[0].attribs["data-sort-value"];
                const name = parent.children[1].children[0].attribs.title;
                ships.push({ id, name });
            }

            return res.status(200).json({
                statusCode: 200,
                statusMessage: "OK",
                message: "The request was successful",
                ships: ships
            });
        } else {
            return res.status(404).json({
                statusCode: 404,
                statusMessage: "Not Found",
                message: "Could not find what you were looking for"
            });
        }
    }

    public getShipsByAffiliation(req: Request, res: Response) {
        if (this.$) {
            let affiliation: string = req.query.affiliation;
            if (!affiliation) {
                return res.status(400).json({
                    statusCode: 400,
                    statusMessage: "Bad Request",
                    message: "Invalid affiliation param"
                });
            }

            affiliation = affiliation.split(" ")
                .map((v) => capitalize(v))
                .join(" ");

            const isValid = affiliations.includes(affiliation);
            if (!isValid) {
                return res.status(400).json({
                    statusCode: 400,
                    statusMessage: "Bad Request",
                    message: `Invalid affiliation "${affiliation}"`
                });
            }

            const items = this.$(`td:contains("${affiliation}")`);
            const values = Object.values(items).filter((v) => v.type === "tag" && v.name === "td");
            const ships: Record<string|number|symbol, string>[] = [];
            for (let i = 0; i < values.length; i++) {
                const parent = values[i].parent;
                const id = parent.children[0].attribs["data-sort-value"];
                const name = parent.children[1].children[0].attribs.title;
                ships.push({ id, name });
            }

            return res.status(200).json({
                statusCode: 200,
                statusMessage: "OK",
                message: "The request was successful",
                ships: ships
            });
        } else {
            return res.status(404).json({
                statusCode: 404,
                statusMessage: "Not Found",
                message: "Could not find what you were looking for"
            });
        }
    }
}
