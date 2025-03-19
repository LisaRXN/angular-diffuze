const express = require("express");
const { app } = require("../dist/diffuze/server/server.mjs");

// Exportez l'application pour que Vercel puisse l'utiliser
module.exports = app;
