require("./db/sqlite");

const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const path = require("path");
const Listr = require("listr");

const env = process.env.NODE_ENV || "dev";
const port = process.env.PORT;

let API_PORT;

if (!port) {
  // If the port is not defined in env
  API_PORT = env == "dev" ? 3001 : 8080;
} else {
  API_PORT = port;
}

const app = express();

const tasks = new Listr([
  {
    title: "Setting up Express",
    task: () =>
      new Listr([
        {
          title: "Registring utilities",
          task: () => {
            app.use(bodyParser.urlencoded({ extended: false }));
            app.use(bodyParser.json());
            app.use(logger("dev"));
          }
        },
        {
          title: "Registring API routes",
          task: () => {
            const apiRouter = require("./api/index.js");
            app.use("/api", apiRouter);
          }
        },
        {
          title: "Serving static React builds files",
          task: () => {
            // Serve the static files from the React app
            app.use(express.static(path.join(__dirname, "/../client/build")));

            // Point everything else to React, this allows us to use react routers
            app.get("*", (req, res) => {
              res.sendFile(
                path.join(__dirname + "/../client/build/index.html")
              );
            });
          }
        },
        {
          title: "Starting server",
          task: () => {
            app.listen(API_PORT, () =>
              console.log(`Listening for HTTP request on port ${API_PORT}`)
            );
          }
        }
      ])
  }
]);

tasks.run();
