module.exports = {
	name: 'ready',
	once: 'true',
	async execute(client) {
		client.user.setPresence({
			status: 'online',
			activity: {
				name: 'your mom',
				type: 'PLAYING',
			},
		});
		console.log(`Logged in as ${client.user.tag}!`);
	},
};