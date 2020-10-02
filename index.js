const http = require("http");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const port = 8000;

const server = http.createServer();

const app = express();
app.use(express.urlencoded());
app.use("/", require("./router"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "Views"));

app.use(expressLayouts);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.use(express.static("./assets"));

//Express ends request instead of loading and loading
app.listen(port, function (err) {
  if (err) {
    res.end("Cannot connect");
  }
  console.log("Connected to server");
  return;
});
