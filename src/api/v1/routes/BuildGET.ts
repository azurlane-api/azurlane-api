import cheerio from "cheerio";
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import BaseRoute from "../BaseRoute";
import { Request, Response } from "express";
import { Controller, ConstructionData } from "../../../utils/Interfaces";

export default class BuildGET extends BaseRoute {

    public constructor(controller: Controller) {
        super({ path: "/build", controller });
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

        // eslint-disable-next-line init-declarations
        let response: AxiosResponse;
        try {
            const reqConfig: AxiosRequestConfig = { headers: { "User-Agent": this.settings.userAgent } }
            response = await axios.get(`${this.settings.baseUrl}/Building`, reqConfig);
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
            const filtered = $(".azltable tbody")[0].children.filter((obj): boolean => obj.name === "tr");
            filtered.forEach((item) => {
                const val = item.children[0].firstChild.data;
                if (val === "Construction Time") return;

                const names: string[] = [];
                const items = item.children[1].children.filter((obj): boolean => obj.name === "div");
                items.forEach((i) => {
                    i.children.forEach((o) => {
                        o.children.forEach((x) => {
                            x.children.forEach((y) => {
                                if (y.attribs.class === "azlicon-caption truncate") {
                                    y.children.forEach((a) => {
                                        names.push(a.data!);
                                    });
                                }
                            });
                        });
                    });
                });

                data.push({ time: val ? val : "", ships: names });
            });

            const result = data.find((obj): boolean => obj.time === time);
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
                    wikiUrl: `${this.settings.baseUrl}/Building#List_of_Ships_by_Construction_Time`,
                    time: result.time,
                    ships: result.ships
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
