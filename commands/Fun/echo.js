const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'echo',
	description: 'make me say something stupid ig',
	cooldown: 1,
	usage: 'echo <channel> <message>',
	async execute(client, message, args) {
		try {
			if (!args[0]) {
				const embed = new MessageEmbed()
				.setTitle('echo')
				.setColor('ORANGE')
				.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
				.setDescription('Make me say stupid ig (to another channel)');
				message.reply({ embeds: [embed] });
			} else if(!args[0].match(/<#[0-9]+>/)) {
				message.channel.send(args.join(' ')).then(
					setTimeout(() => {
						message.delete();
					}, 4000)
				);
				message.react('✅');
				setTimeout(() => {
					message.delete();
				}, 5000);
			} else {
				if(!args[0].match(/<#[0-9]+>/) && args[1]) {
					message.channel.send('You didnt specify a channel!');
				} else if(args[0].match(/<#[0-9]+>/) && args[1]) {
					const channel = args[0].slice(2, -1);
					const sendChannel = client.channels.cache.get(channel);
					const message = args.slice(1).join(' ');
					sendChannel.send(message).then(
						setTimeout(() => {
							message.delete();
						}, 4000)
					);
				};
				message.react('✅');
			}
		} catch (error) {
			console.log(error);
			return message.reply('There was an error trying to execute that command!');
		}
	},
};