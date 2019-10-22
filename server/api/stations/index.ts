import * as express from "express";
const router = express.Router();
const stations = require("../../stations");

router.get("/", async (req, res) => {
  let list = await stations.list();
  if (!list) list = [];

  if (req.query.status) {
    for (let i = 0; i < list.length; i++) {
      const station = list[i];
      list[i].status = await stations.getStatus(station.ip);
    }
  }

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

router.post("/:id/beep", async (req, res) => {
  const id = req.params.id;
  const double = req.query.double;

  const station = await stations.get(id);

  try {
    await stations.beep(id, double);
    return res.json({ error: null });
  } catch (error) {
    return res.json({ error: error.statusMessage });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await stations.remove(id);
    return res.json({ error: null });
  } catch (error) {
    return res.json({ error: error.statusMessage });
  }
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

export = router;
