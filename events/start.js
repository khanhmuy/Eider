module.exports = {
	name: 'ready',
	once: 'true',
	async execute(client) {
		client.user.setStatus({
			status: 'online',
		});
		client.user.setActivity('just got started up');
		console.log(`Connection established (${client.ws.ping}ms). Logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`)
		setInterval(() => {
			let now = require('./../status.json')[Math.floor(Math.random() * require('./../status.json').length)]
			if (!now.status) now.status = 'dnd';
			client.user.setStatus({
				status: now.status,
			})
			client.user.setActivity(now.name)
		}, 15000)
	},
};