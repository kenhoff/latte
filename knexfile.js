// Update with your config settings.

module.exports = {
	development: {
		client: "sqlite3",
		connection: {
			filename: "./dev.db"
		}
	},
	production: {
		client: "postgresql",
		connection: process.env.DATABASE_URL
	}
};
