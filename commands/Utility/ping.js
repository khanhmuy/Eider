const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'ping',
	description: 'See the bots ping.',
	usage: 'ping',
	cooldown: 5,
	aliases: [ 'latency', 'pong' ],
	async execute(client, message) {
		message.channel.send('Pinging...').then((msg) => {
			const ping = msg.createdTimestamp - message.createdTimestamp;
			var color = 'RANDOM';
			if (ping < 150) {
				color = 'GREEN';
			} else if (ping > 150 && ping < 250) {
				color = 'YELLOW';
			} else if (ping > 250) {
				color = 'RED';
			}
			const embed = new MessageEmbed()
				.setColor(color)
				.setTitle('Pong!')
				.addFields(
					{ name: 'Websocket Heartbeat', value: `${client.ws.ping}ms`, inline: true },
					{ name: 'Roundtrip Latency', value: `${ping}ms`, inline: true }
				)
			message.channel.send({ embeds: [embed] });
			msg.delete();
		});
	},
};
