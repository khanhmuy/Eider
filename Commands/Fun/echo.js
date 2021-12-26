const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'echo',
	description: 'make me say something stupid ig',
	cooldown: 2,
	usage: 'echo <channel> <message>',
	async execute(client, message, args) {
		if (!args[0]) {
			const embed = new MessageEmbed()
			.setTitle('echo')
			.setColor('ORANGE')
			.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
			.setDescription('Make me say stupid ig (to another channel)');
			message.reply({ embeds: [embed] });
		} else if(!args[0].match(/<#[0-9]+>/)) {
			message.channel.send(args.join(' '));
			message.react('✅');
		} else {
			if(!args[0].match(/<#[0-9]+>/) && args[1]) {
				message.channel.send('You didnt specify a channel!');
			} else if(args[0].match(/<#[0-9]+>/) && args[1]) {
				const channel = args[0].slice(2, -1);
				const sendChannel = client.channels.cache.get(channel);
                const message = args.slice(1).join(' ');
				sendChannel.send(message);
			};
			message.react('✅');
		}
	},
};