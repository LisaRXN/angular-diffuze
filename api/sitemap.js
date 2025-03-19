import { sitemapHandler } from "../sitemapHandler.js";
import express from "express";

const app = express();
app.use(sitemapHandler);

export default app;
