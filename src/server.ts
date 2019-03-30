import express from "express";
import settings from "../settings";
import APIv1 from "./api/v1/Router";

const app = express();
const port = settings.env === "production" ? settings.port : 8080;
const api = new APIv1(settings);

app.set("env", settings.env);
app.disable("x-powered-by");

app.use(express.json());
app.use(api.path, api.router);

app.listen(port, (error: Error) => {
    if (error) return console.error(error);
    console.info(`Starting http server on port ${port}`);
});