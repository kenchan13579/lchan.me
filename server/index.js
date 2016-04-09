"use strict";
let process = require("process");
let express = require("express");
let config = require("./config");
let morgan = require("morgan"),
    path = require("path"),
    errorhandler = require('errorhandler'),
	serveStatic = require("serve-static"),
	cookieParser = require("cookie-parser"),
	cookieSession = require('cookie-session'),
	bodyParser = require("body-parser");
let projectRouter = require("./routes/project");
let app  = express();
var mongoose = require("mongoose");

mongoose.connect(config.database);
mongoose.connection.on("connected", () => console.log("connected"));
mongoose.connection.on("error", (err) => console.log(err));


app.set("views", ["../weiboFollower/dist/"]);
app.set("view engine","jade");

// app.use(session({secret: config.salt, resave:true,saveUninitialized: true}));
app.use(cookieSession(config.SESSION_OPTIONS));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser(config.salt));

app.use("/" , serveStatic(path.resolve("../lchan.me")));
app.use("/api", require("./routes/api"));
app.use("/projects", projectRouter);

let PORT = process.argv[process.argv.length -1 ] || config.PORT;

process.env.NODE_ENV = "dev";
if (process.env.NODE_ENV === 'dev') {
  // only use in development
  app.use(errorhandler())
}

app.listen(PORT, () => {
    console.log("Listening on port %s", PORT);
});
