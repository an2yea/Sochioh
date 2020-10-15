// const http = require("http");
const express = require("express");
//Accessing Environment Variables
const env = require('./config/environment');
//Cookie parser
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 8000;
const expressLayouts = require("express-ejs-layouts");
const path = require("path");

const db = require("./config/mongoose");
//used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportJWT = require("./config/passport_jwt_strategy");
const passportGoogle = require("./config/passport-google-oauth2-strategy");
//Cookie doesn't get lost on creating another session
const MongoStore = require("connect-mongo")(session);
const sassMiddleware = require("node-sass-middleware");
//To be able to use NOTY we connect-flash//
const flash = require("connect-flash");
const CustomMiddleware = require("./config/middeware");
//Chat server Setup//
const chatServer = require("http").Server(app);
const chatSockets = require("./config/chat_sockets").chatSockets(chatServer);
chatServer.listen(5000); //port other than original
console.log("Chat server listening");

app.use(
  sassMiddleware({
    src: path.join(__dirname,env.asset_path,'scss'),
    dest: path.join(__dirname,env.asset_path,'css'),
    debug: true,
    outputStyle: "extended",
    prefix: "/css",
  })
);
app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static(env.asset_path));
//Making uploads path available
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(expressLayouts);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "Views"));
//Mongo Store used to store session cookie in the database
app.use(
  session({
    name: "sochioh",
    secret: env.session_cookie_key,
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
