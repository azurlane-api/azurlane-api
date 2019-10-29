import express from "express";
import RateLimit from "express-rate-limit";
import settings from "../settings";
import Logger from "./utils/Logger";
import APIv1 from "./api/v1/Router";

const server = express();
const port = process.env.PORT || 8080;
const logger = new Logger();
const api = new APIv1({ settings, logger });

const limiter = new RateLimit({
    windowMs: 5 * 1000,
    max: 10,
    handler: (_req, res) => res.status(429).json({
        statusCode: 429,
        statusMessage: "Too Many Requests",
        message: "owo you hit the ratelimit, please calm down b-baka!"
    })
});

async function main(): Promise<void> {
    await api.loadRoutes();

    server.enable("trust proxy");
    server.disable("x-powered-by");

    server.set("json spaces", 4);
    server.set("env", settings.env);

    server.use(limiter);
    server.use(express.json());
    server.use(api.path, api.router);

    server.get("/", (_req, res) => {
        res.status(302).redirect("/v1");
    });

    server.listen(port, () => {
        logger.ready(`Starting http server on port ${port}`);
    });
}

main().catch((e) => logger.error("MAIN", e.toString()));
