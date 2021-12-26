const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'avatar',
	description: 'Get the avatar of a user',
	usage: 'avatar [user]',
	cooldown: 5,
	aliases:[ 'av', 'pfp', 'avt', 'getavatar', 'getpfp', 'getavt' ],
	async execute(client, message, args) {
		let embed = '';
		if (!args[0]) {
			embed = new MessageEmbed()
				.setTitle(`Avatar of ${message.author.username}`)
				.setColor('BLUE')
				.setImage(message.author.displayAvatarURL() + '?size=1024')
				.setURL(message.author.displayAvatarURL() + '?size=1024');
		} else {
			if (!args[0].match(/<@!*&*[0-9]+>/)) return message.reply('Thats not a user!');
			embed = new MessageEmbed()
				.setTitle(`Avatar of ${message.mentions.users.first().username}`)
				.setColor('BLUE')
				.setImage(message.mentions.users.first().displayAvatarURL() + '?size=1024')
				.setURL(message.mentions.users.first().displayAvatarURL() + '?size=1024');
		}
		message.reply({ embeds: [embed] });
	},
};