const sampleProfiles = [{
	id: "reinhardt",
	name: "Reinhardt Wilhelm",
	photo_url: "https://blzgdapipro-a.akamaihd.net/hero/reinhardt/hero-select-portrait.png"
}, {
	id: "zarya",
	name: "Aleksandra Zaryanova",
	photo_url: "https://blzgdapipro-a.akamaihd.net/hero/zarya/hero-select-portrait.png"
}];

const samplePosts = [{
	content: "I am unstoppable!",
	profile: "reinhardt",
	datetime: new Date(2000, 0, 1).toISOString()
}, {
	content: "Check out this gun!",
	profile: "zarya",
	datetime: new Date(2000, 0, 2).toISOString()
}, {
	content: "Join me in glory!",
	profile: "reinhardt",
	datetime: new Date(2000, 0, 3).toISOString()
}];


// this looks terribad, but let me explain.
// we have to delete the posts before the profiles, due to the foreign key constraint.
// we have to insert the new profiles before the posts, again because of the foreign key constraint.
// (there can never exist a post with a foreign key that points to a profile that does not exist)

exports.seed = function(knex) {
	return knex("posts").del().then(function() {
		return knex("profiles").del().then(function() {
			return knex("profiles").insert(sampleProfiles).then(function() {
				return knex("posts").insert(samplePosts);
			});
		});
	});
};
