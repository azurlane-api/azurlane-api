import express from "express";
import path from "path";
import settings from "../settings";
import APIv1 from "./api/v1/Router";

const server = express();
const port = settings.env === "production" ? process.env.PORT : 8080;
const api = new APIv1(settings);

async function main() {
    await api.loadRoutes();

    server.enable("trust proxy");
    server.disable("x-powered-by");

    server.set("views", path.join(__dirname, "views"));
    server.set("view engine", "ejs");
    server.set("json spaces", 4);
    server.set("env", settings.env);

    server.use(express.json());
    server.use(api.path, api.router);

    server.get("/", (_req, res) => {
        res.status(301).redirect("/v1");
    });

    server.listen(port, (error: Error) => {
        if (error) return console.error(error);
        console.info(`Starting http server on port ${port}`);
    });
}

main().catch(console.error);