import cheerio from "cheerio";
import axios, { AxiosResponse } from "axios";
import { Router, Request, Response } from "express";
import { Controller, Settings, ConstructionData } from "../../../utils/Interfaces";

export default class BuildGET {
    public path: string;
    public router: Router;
    public settings: Settings;

    constructor(controller: Controller) {
        this.path = "/build";
        this.router = controller.router;
        this.settings = controller.settings;

        this.router.get(this.path, this.run.bind(this));
    }

    public async run(req: Request, res: Response): Promise<Response> {
        const time: string = req.query.time;
        if (!time) {
            return res.status(400).json({
                statusCode: 400,
                statusMessage: "Bad Request",
                message: "Missing a time query param."
            });
        }

        let response: AxiosResponse;
        try {
            response = await axios.get(`${this.settings.baseUrl}/Building`);
        } catch (e) {
            return res.status(400).json({
                statusCode: 400,
                statusMessage: "Bad Request",
                message: "Invalid construction time."
            });
        }

        try {
            const $ = cheerio.load(response.data);
            const data: ConstructionData[] = [];
            const filtered = $("table[style=\"text-align:left;margin:auto;font-weight:700;width:100%\"] tbody")[0].children.filter((obj) => obj.name === "tr");
            filtered.forEach((item) => {
                const val = item.children[0].children[0].data;
                if (val === "Construction Time") return;

                const names: string[] = [];
                item.children[1].children.filter((obj) => obj.name === "table").forEach((i) => {
                    names.push(i.children[1].children[0].children[1].children[0].children[0].children[0].attribs.title);
                });

                data.push({ time: val ? val : "", ships: names });
            });

            const result = data.find((obj) => obj.time === time);
            if (!result) {
                return res.status(400).json({
                    statusCode: 400,
                    statusMessage: "Bad Request",
                    message: "Invalid construction time."
                });
            }

            return res.status(200).json({
                statusCode: 200,
                statusMessage: "OK",
                message: "The request was successful",
                construction: {
                    time: result.time,
                    ships: result.ships
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