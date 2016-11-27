if (process.env.NODE_ENV != "production") {
	require("dotenv").config();
}
const PROFILE_SECRETS = JSON.parse(process.env.PROFILE_SECRETS);
const express = require("express");
const knex = require("knex")(require("./knexfile.js")[process.env.NODE_ENV || "development"]);

const bodyParser = require("body-parser");
const marked = require("marked");
const fs = require("fs");

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

const port = process.env.PORT || 1234;


app.get("/", function(req, res) {
	let indexHTML = marked(fs.readFileSync(__dirname + "/index.md").toString());
	res.send(indexHTML);
});

app.get("/api/profiles", function(req, res) {
	knex.select().from("profiles")
		.then(function(profiles) {
			return res.status(200).json(profiles);
		}).catch(function(error) {
			return res.status(500).send(error);
		});
});

app.post("/api/profiles", function(req, res) {
	// to create a new profile, just
	return res.status(400).send("Sorry, we don't support creating new profiles at this time.");
});

app.get("/api/profiles/:profile_id", function(req, res) {
	knex.select().from("profiles").where({
		id: req.params.profile_id
	}).then(function(results) {
		if (results.length == 0) {
			return res.status(404).send("User not found");
		} else {
			return res.status(200).json(results[0]);
		}
	}).catch(function(error) {
		return res.status(500).send(error);
	});
});

app.post("/api/profiles/:profile_id", function(req, res) {
	// to create a new profile in the database, just send a post request, no name or photo_url necessary

	// if the profile_secret matches the profile_id, then update the profile with the given fields (just name and photo_url)
	if (!("profile_secret" in req.body)) {
		// if there is no profile_secret, throw an error
		return res.status(400).send("You must include the profile_secret for the profile_id that you'd like to update.");
	} else if (req.body.profile_secret != PROFILE_SECRETS[req.params.profile_id]) {
		return res.status(401).send("You have the wrong profile_secret for the profile_id that you're trying to update.");
	}
	// else if (!("name" in req.body) && !("photo_url" in req.body)) {
	// 	return res.status(400).send("You must include a name or photo_url to update on the profile.");
	// }
	knex.select().from("profiles").where({
		id: req.params.profile_id
	}).then(function(results) {
		if (results.length == 0) {
			// then the user hasn't been created yet - create the user with the fields in the body
			let newProfile = {
				id: req.params.profile_id
			};
			if ("name" in req.body) {
				newProfile.name = req.body.name;
			}
			if ("photo_url" in req.body) {
				newProfile.photo_url = req.body.photo_url;
			}
			knex("profiles").insert(newProfile).then(function() {
				return res.status(201).json(newProfile);
			}).catch(function(error) {
				return res.status(500).send(error);
			});
		} else {
			let profile = results[0];
			if ("name" in req.body) {
				profile.name = req.body.name;
			}
			if ("photo_url" in req.body) {
				profile.photo_url = req.body.photo_url;
			}
			knex("profiles").where({
				id: req.params.profile_id
			}).update(profile).then(function() {
				// just returns the number of rows updated
				return res.status(200).json(profile);
			}).catch(function(error) {
				return res.status(500).send(error);
			});
		}
	});
});

app.get("/api/posts", function(req, res) {
	knex.select().from("posts").limit(100).orderBy("datetime", "desc")
		.then(function(posts) {
			return res.status(200).json(posts);
		}).catch(function(error) {
			return res.status(500).send(error);
		});
});

app.post("/api/posts", function(req, res) {
	// TODO: check to see if the profile_id actually exists
	// TODO: check to make sure that content isn't blank
	// if the profile_secret matches the profile_id, then create a profile with that name on it
	if (!("profile_id" in req.body)) {
		// if there is no profile_id, throw an error
		return res.status(400).send("You must include a profile_id to post to.");
	} else if (!("profile_secret" in req.body)) {
		// if there is no profile_secret, throw an error
		return res.status(400).send("You must include the profile_secret for the profile_id that you'd like to post to.");
	} else if (!("content" in req.body)) {
		// if there is no body, throw an error
		return res.status(400).send("You must include a content field for your post's content.");
	} else if (req.body.profile_secret != PROFILE_SECRETS[req.body.profile_id]) {
		// unauthed
		return res.status(401).send("You have the wrong profile_secret for the profile_id that you're trying to post to.");
	} else {
		knex("posts").insert({
			datetime: new Date().toISOString(),
			content: req.body.content,
			profile: req.body.profile_id
		}).then(function() {
			return res.status(201).send("Post created successfully");
		}).catch(function(error) {
			return res.status(500).send(error);
		});
	}
});


app.listen(port, function() {
	console.log("Listening on", port + "..."); // eslint-disable-line no-console
});
