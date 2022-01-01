module.exports = {
	name: 'ready',
	once: 'true',
	async execute(client) {
		client.user.setStatus({
			status: 'online',
		});
		client.user.setActivity('Just got started up!');
		console.log(`Connection established (${client.ws.ping}ms). Connected as ${client.user.username}#${client.user.discriminator} (${client.user.id})`)
		setInterval(() => {
			let now = require('./../status.json')[Math.floor(Math.random() * require('./../status.json').length)]
			if (!now.status) now.status = 'dnd';
			if (now.url) {
			  client.user.setStatus({
				status: now.status,
			  })
			  client.user.setActivity(now.name)
			}
			console.log(now.name)
			console.log(now.type)
			console.log(now.status)
		}, 15000)
	},
};