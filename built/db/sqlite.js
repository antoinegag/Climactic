var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("./stations.db", function (err) {
    if (err) {
        console.error(err.message);
        return;
    }
    db.run("CREATE TABLE IF NOT EXISTS stations (id INTEGER PRIMARY KEY, ip varchar(16), name TEXT);");
    console.info("Connected to the stations database.");
});
module.exports = db;
