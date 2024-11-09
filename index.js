const express = require("express");

let app = express();

let path = require("path");

const port = 3000;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "donuts-db-juan.c5aiso2wg4pg.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "password1",
    database: "donuts",
    port: 3306,
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
