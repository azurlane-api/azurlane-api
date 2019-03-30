import { Router, Request, Response } from "express";
import { Controller, Settings } from "../../../utils/Interfaces";

export default class TestGET {
    public path: string;
    public router: Router;
    public settings: Settings;

    public constructor(controller: Controller) {
        this.path = "/test";
        this.router = controller.router;
        this.settings = controller.settings;

        this.router.get(this.path, this.run.bind(this));
    }

    public async run(_req: Request, res: Response): Promise<Response> {
        return res.status(200).json({
            statusCode: 200,
            statusMessage: "OK",
            message: "The request was successful",
            data: {
                test: "Testing 123"
            }
        });
    }
}