// const http = require("http");
const express = require("express");
//Cookie parser
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const path = require("path");

const db = require("./config/mongoose");
//used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");

//Cookie doesn't get lost on creating another session
const MongoStore = require("connect-mongo")(session);
const sassMiddleware = require("node-sass-middleware");
const flash = require("connect-flash");
const CustomMiddleware = require("./config/middeware");
// const server = http.createServer();

app.use(
  sassMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    debug: true,
    outputStyle: "extended",
    prefix: "/css",
  })
);
app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static("./assets"));

app.use(expressLayouts);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "Views"));
//Mongo Store used to store session cookie in the database
app.use(
  session({
    name: "sochioh",
    secret: "vnaibrbgr",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100, //in milliseconds
    },
    store: new MongoStore(
      {
        mongooseConnection: db,
        autoRemove: "disabled",
      },
      //if connection doesn't happen
      function (err) {
        console.log(err || "mongo-store connection ok");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(CustomMiddleware.setFlash);
app.use("/", require("./router"));

//Express ends request instead of loading and loading
app.listen(port, function (err) {
  if (err) {
    res.end("Cannot connect");
  }
  console.log("Connected to server");
  return;
});
