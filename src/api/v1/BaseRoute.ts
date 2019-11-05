import { Request, Response, Router } from "express";
import { Settings, Controller } from "../../utils/Interfaces";

interface BaseRouteContext {
    path: string;
    controller: Controller;
}

export default abstract class BaseRoute {
    protected _key: string;
    public path: string;
    public router: Router;
    public settings: Settings;

    public constructor(context: BaseRouteContext) {
        this._key = context.path;
        this.path = context.path;
        this.router = context.controller.router;
        this.settings = context.controller.settings;
    }

    public abstract async run(req: Request, res: Response): Promise<unknown>;
}
