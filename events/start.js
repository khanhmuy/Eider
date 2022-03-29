const { message } = require('discord.js');

module.exports = {
	name: 'ready',
	once: 'true',
	async execute(client) {
		client.user.setStatus({
			status: 'online',
		});
		client.user.setActivity('just got started up!');
		console.log(`Connection established (${client.ws.ping}ms). Logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`)
		const up = client.channels.cache.get('893124437510074368');
		up.send(`Connection established (${client.ws.ping}ms). Logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`);
		setInterval(() => {
			let now = require('./../status.json')[Math.floor(Math.random() * require('./../status.json').length)]
			if (!now.status) now.status = 'dnd';
			client.user.setStatus({
				status: now.status,
			})
			client.user.setActivity(now.name, {type: now.type})
		}, 20000)
	},
};