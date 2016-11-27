// Update with your config settings.

module.exports = {
	production: {
		client: "postgresql",
		connection: process.env.DATABASE_URL
	},
	development: {
		client: "postgresql",
		connection: "postgres://localhost"
	}
};
