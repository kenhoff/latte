exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.createTable("posts", function(table) {
			table.increments("id").primary();
			table.timestamp("datetime").defaultTo(knex.fn.now());
			table.text("content");
		}),
		knex.schema.createTable("profiles", function(table) {
			table.string("id").primary();
			table.string("name");
			table.text("photo_url");
		})
	]);
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.dropTable("posts"),
		knex.schema.dropTable("profiles")
	]);
};
