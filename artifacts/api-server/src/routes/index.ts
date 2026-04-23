import { Router } from "express";
import healthRouter from "./health.js";

const router = Router();

router.get("/", (_req, res) => {
  res.statusCode = 200;
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.end(JSON.stringify({ status: "ok", message: "API server is running" }));
});

router.use(healthRouter);

export default router;
