const express = require("express");
const router = express.Router();
const stations = require("../../stations");

router.get("/", async (req, res) => {
  let list = await stations.list();
  if (!list) list = [];
  return res.json(list);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const station = await stations.get(id);

  if (station) {
    return res.json(station);
  }

  res.status(404);
  return res.json({ error: `No station found for id ${id}` });
});

router.get("/:id/data", async (req, res) => {
  const id = req.params.id;
  const station = await stations.get(id);

  if (station) {
    return res.json(await stations.getData(id));
  }

  res.status(404);
  return res.json({ error: `No station found for id ${id}` });
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await stations.remove(id);

  return res.json({ error: null });
});

router.post("/register", async (req, res) => {
  const { ip, name } = req.body;

  if (!ip || !name) {
    res.status(400);
    return res.json({ error: "Missing paramters" });
  }

  try {
    await stations.register(ip, name);
    return res.json({ error: null });
  } catch (error) {
    res.status(500);
    return res.json({ error: error.message });
  }
});

module.exports = router;
