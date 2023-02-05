const express = require("express");
const routes = express.Router();
import { Response, Request } from "express";

routes.get("/", (req: Request, res: Response) => {
  res.json({ message: "get all USERS" });
});

module.exports = routes;
