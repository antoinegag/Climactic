const sqlite3 = require("sqlite3").verbose();

const sqliteDatabase = new sqlite3.Database("./stations.db", err => {
  if (err) {
    console.error(err.message);
    return;
  }

  sqliteDatabase.run(
    "CREATE TABLE IF NOT EXISTS stations (id INTEGER PRIMARY KEY, ip varchar(16), name TEXT, confirmed bool);"
  );

  console.info("Connected to the stations database.");
});

export = sqliteDatabase;
