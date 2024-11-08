require('dotenv').config();

const express = require("express");

let app = express();

let path = require("path");

const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const knex = require("knex")({
  client: "mysql",
  connection: {
    host:
      process.env.RDS_HOSTNAME ||
      "donuts-db-juan.c5aiso2wg4pg.us-east-2.rds.amazonaws.com",
    user: process.env.RDS_USERNAME || "admin",
    password: process.env.RDS_PASSWORD || "password1",
    database: process.env.RDS_DB_NAME || "donuts",
    port: process.env.RDS_PORT || 3306,
  },
});

app.get("/", (req, res) => {
  let query = knex.select().from("donuts");
  query.toString();
  query.then((donuts) => {
    res.render("index", { donuts });
  });
});

app.listen(port, () => console.log("listening"));
