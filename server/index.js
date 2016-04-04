"use strict";
let process = require("process");
let express = require("express");
let config = require("./config");

let app  = express();

app.get("/", (req, res) => {
	res.end("developing");
});


let PORT = process.argv[2] || config.PORT || 80;
app.listen(PORT, () => {
	console.log("Listening on port %s", PORT);
});