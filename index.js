const express = require("express");
const knex = require("knex")(require("./knexfile.js")[process.env.NODE_ENV || "development"]);

let app = express();

const port = process.env.PORT || 1234;

app.get("/", function(req, res) {
	res.send("Hello!");
});

app.listen(port, function() {
	console.log("Listening on", port + "...");
});
