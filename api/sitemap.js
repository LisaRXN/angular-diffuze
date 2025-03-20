import { sitemapHandler } from "../sitemapHandler.ts";
import express from "express";

const app = express();
app.get("/api/sitemap.xml", sitemapHandler);

export default app;
