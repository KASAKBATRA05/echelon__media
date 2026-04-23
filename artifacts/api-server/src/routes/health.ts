import { Router } from "express";

const router = Router();

router.get("/healthz", (_req, res) => {
  res.statusCode = 200;
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.end(JSON.stringify({ status: "ok" }));
});

export default router;
