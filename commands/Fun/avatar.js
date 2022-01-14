const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'avatar',
	description: 'Get the avatar of a user',
	usage: 'avatar [user]',
	cooldown: 2,
	aliases:[ 'av', 'pfp', 'avt', 'getavatar', 'getpfp', 'getavt' ],
	async execute(client, message, args) {
		try {
			let jpeg = '';
			let png = '';
			let webp = '';
			let embed = '';
			if (!args[0]) {
				jpeg = message.author.displayAvatarURL({ format: 'jpeg', dynamic: true, size: 1024 });
				png = message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });
				webp = message.author.displayAvatarURL({ format: 'webp', dynamic: true, size: 1024 });
				embed = new MessageEmbed()
				.setTitle(`Avatar of ${message.author.username}`)
				.addField('Download as', '[jpeg](' + jpeg + ') | [png](' + png + ') | [webp](' + webp + ')')
				.setColor('BLUE')
				.setImage(jpeg)
				.setURL(jpeg);
			} else {
				if (!args[0].match(/<@!*&*[0-9]+>/)) return message.reply('Thats not a user!').then(x => {
					setTimeout(() => {
						message.delete();
						x.delete();
					}, 5000);
				});
				const rawLink = message.mentions.users.first().displayAvatarURL();
				jpeg = rawLink.slice(0, 86) + '.jpg?size=1024';
				png = rawLink.slice(0, 86) + '.png?size=1024';
				webp = rawLink.slice(0, 86) + '.webp?size=1024';
				embed = new MessageEmbed()
					.setTitle(`Avatar of ${message.mentions.users.first().username}`)
					.addField('Download as', '[jpeg](' + jpeg + ') | [png](' + png + ') | [webp](' + webp + ')')
					.setColor('BLUE')
					.setImage(jpeg)
					.setURL(jpeg);
			}
			message.reply({ embeds: [embed] });
		} catch {
			return message.reply('An error occurred!').then(x => {
				setTimeout(() => {
					message.delete();
					x.delete();
				}, 4000);
			});
		}
	},
};