import "reflect-metadata";

import * as express from "express";
import * as bodyParser from "body-parser";
import * as logger from "morgan";
import * as path from "path";
import * as Listr from "listr";
import { buildSchema } from "type-graphql";
import StationNetworkHandler from "./network/StationNetworkHandler";
import WebSocketHandler from "./network/WebSocketHandler";

const { ApolloServer } = require("apollo-server-express");

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
    title: "Setting up SQLite",
    task: () => {
      require("./db/sqlite");
    }
  },
  {
    title: "Setting up GraphQL server",
    task: async () => {
      let schema;
      try {
        schema = await buildSchema({
          resolvers: [__dirname + "/**/*.resolver.ts"]
        });
      } catch (error) {
        console.error(error);
        return;
      }

      // Create the GraphQL server
      const server = new ApolloServer({
        schema,
        playground: {
          settings: {
            "editor.theme": "dark"
          }
        }
      });

      server.applyMiddleware({ app: app });
    }
  },
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
        }
      ])
  },
  {
    title: "Starting Network handler",
    task: async () => {
      await StationNetworkHandler.start(2390);
    }
  },
  {
    title: "Setting up Web Socket server",
    task: async () => {
      WebSocketHandler.init();
    }
  },
  {
    title: "Starting server",
    task: async () => {
      app.listen(API_PORT, () =>
        console.log(`Listening for HTTP request on port ${API_PORT}`)
      );
    }
  }
]);

tasks.run();
