require("./db/sqlite");
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var path = require("path");
var Listr = require("listr");
var env = process.env.NODE_ENV || "dev";
var port = process.env.PORT;
var API_PORT;
if (!port) {
    // If the port is not defined in env
    API_PORT = env == "dev" ? 3001 : 8080;
}
else {
    API_PORT = port;
}
var app = express();
var tasks = new Listr([
    {
        title: "Setting up Express",
        task: function () {
            return new Listr([
                {
                    title: "Registring utilities",
                    task: function () {
                        app.use(bodyParser.urlencoded({ extended: false }));
                        app.use(bodyParser.json());
                        app.use(logger("dev"));
                    }
                },
                {
                    title: "Registring API routes",
                    task: function () {
                        var apiRouter = require("./api/index.js");
                        app.use("/api", apiRouter);
                    }
                },
                {
                    title: "Serving static React builds files",
                    task: function () {
                        // Serve the static files from the React app
                        app.use(express.static(path.join(__dirname, "/../client/build")));
                        // Point everything else to React, this allows us to use react routers
                        app.get("*", function (req, res) {
                            res.sendFile(path.join(__dirname + "/../client/build/index.html"));
                        });
                    }
                },
                {
                    title: "Starting server",
                    task: function () {
                        app.listen(API_PORT, function () {
                            return console.log("Listening for HTTP request on port " + API_PORT);
                        });
                    }
                }
            ]);
        }
    }
]);
tasks.run();
