exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.table("posts", function(table) {
			table.string("profile");
			table.foreign("profile").references("id").inTable("profiles");
		})
	]);
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.table("posts", function(table) {
			table.dropColumn("profile");
		})
	]);
};
