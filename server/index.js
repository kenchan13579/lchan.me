"use strict";
let process = require("process");
let express = require("express");
let config = require("./config");
let morgan = require("morgan"),
	serveStatic = require("serve-static"),
	cookieParser = require("cookie-parser"),
	cookieSession = require('cookie-session'),
	bodyParser = require("body-parser");
let app  = express();
app.set("view engine","jade");

app.use(cookieSession(config.SESSION_OPTIONS));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());€
app.use(cookieParser());
app.use(serveStatic(__dirname + "/public/dist"))

app.get("/", (req, res) => {
	res.end("developing");
});

let PORT = process.argv[process.argv.length -1 ] || config.PORT || 80;

app.listen(PORT, () => {
	console.log("Listening on port %s", PORT);
});