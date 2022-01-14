const Vibrant = require('node-vibrant');
const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'avatar',
	description: 'Get the avatar of a user',
	usage: 'avatar [user]',
	cooldown: 2,
	aliases:[ 'av', 'pfp', 'avt', 'getavatar', 'getpfp', 'getavt' ],
	async execute(client, message, args) {
		try {
			const wait = await message.channel.send('Give me a second please...');
			let jpeg = '';
			let png = '';
			let webp = '';
			let embed = '';
			let color = '';
			if (!args[0]) {
				color = await Vibrant.from(message.author.displayAvatarURL({ format: 'png', size: 1024 })).getPalette();
				jpeg = message.author.displayAvatarURL({ format: 'jpeg', dynamic: true, size: 1024 });
				png = message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });
				webp = message.author.displayAvatarURL({ format: 'webp', dynamic: true, size: 1024 });
				embed = new MessageEmbed()
				.setTitle(`Avatar of ${message.author.username}`)
				.addField('Download as', '[jpeg](' + jpeg + ') | [png](' + png + ') | [webp](' + webp + ')')
				.setColor(color.Vibrant.hex)
				.setImage(png)
				.setURL(png);
			} else {
				if (!args[0].match(/<@!*&*[0-9]+>/)) return message.reply('Thats not a user!').then(x => {
					setTimeout(() => {
						message.delete();
						x.delete();
					}, 5000);
				});
				color = await Vibrant.from(message.mentions.users.first().displayAvatarURL({ format: 'png', size: 1024 })).getPalette();
				const rawLink = message.mentions.users.first().displayAvatarURL();
				jpeg = rawLink.slice(0, 86) + '.jpg?size=1024';
				png = rawLink.slice(0, 86) + '.png?size=1024';
				webp = rawLink.slice(0, 86) + '.webp?size=1024';
				embed = new MessageEmbed()
					.setTitle(`Avatar of ${message.mentions.users.first().username}`)
					.addField('Download as', '[jpeg](' + jpeg + ') | [png](' + png + ') | [webp](' + webp + ')')
					.setColor(color.Vibrant.hex)
					.setImage(png)
					.setURL(png);
			}
			wait.delete();
			message.reply({ embeds: [embed] });
		} catch(error) {
			return message.reply('An error occurred!').then(x => {
				setTimeout(() => {
					wait.delete();
					console.log(error)
					message.delete();
					x.delete();
				}, 4000);
			});
		}
	},
};