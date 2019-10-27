import BaseRoute from "../BaseRoute";
import { Request, Response } from "express";
import { Controller } from "../../../utils/Interfaces";

export default class TestGET extends BaseRoute {

    public constructor(controller: Controller) {
        super({ path: "/test", controller });
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