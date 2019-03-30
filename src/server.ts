import express from "express";
import path from "path";
import settings from "../settings";
import APIv1 from "./api/v1/Router";

const app = express();
const port = settings.env === "production" ? process.env.PORT : 8080;
const api = new APIv1(settings);

async function main() {
    await api.loadRoutes();

    app.enable("trust proxy");
    app.disable("x-powered-by");

    app.set("views", path.join(__dirname, "views"));
    app.set("view engine", "ejs");
    app.set("json spaces", 4);
    app.set("env", settings.env);

    app.use(express.json());
    app.use(api.path, api.router);

    app.get("/", (_req, res) => {
        res.render("index")
    });

    app.listen(port, (error: Error) => {
        if (error) return console.error(error);
        console.info(`Starting http server on port ${port}`);
    });
}

main().catch(console.error);