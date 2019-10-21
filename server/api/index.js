const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  return res.json({ success: true });
});

const stationsRouter = require("./stations");
router.use("/stations", stationsRouter);

module.exports = router;
