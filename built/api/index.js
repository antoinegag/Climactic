var express = require("express");
var router = express.Router();
router.get("/", function (req, res) {
    return res.json({ success: true });
});
var stationsRouter = require("./stations");
router.use("/stations", stationsRouter);
module.exports = router;
