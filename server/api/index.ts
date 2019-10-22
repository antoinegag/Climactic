import * as express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  return res.json({ success: true });
});

import * as stationsRouter from "./stations";
router.use("/stations", stationsRouter);

module.exports = router;
