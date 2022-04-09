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
				.setImage(message.author.displayAvatarURL({size: 1024, dynamic: true}))
				.setURL(png);
			} else {
				let id = '';
				let user = '';
				if (!args[0].match(/<@!*&*[0-9]+>/)) {
					id = args[0];
					user = await message.guild.members.cache.get(id);
				} if (args[0].match(/<@!*&*[0-9]+>/)) {
					id = message.mentions.users.first();
					user = await message.guild.members.cache.get(id.id);
					if (id === undefined) {return message.channel.send('Please provide a valid user!').then(x => {
						setTimeout(() => {
							message.delete();
							x.delete();
						}, 5000);
					})}
				}
				color = await Vibrant.from(user.user.avatarURL({ format: 'png', size: 1024 })).getPalette();
				const rawLink = user.user.avatarURL();
				jpeg = rawLink.slice(0, 86) + '.jpg?size=1024';
				png = rawLink.slice(0, 86) + '.png?size=1024';
				webp = rawLink.slice(0, 86) + '.webp?size=1024';
				embed = new MessageEmbed()
					.setTitle(`Avatar of ${user.user.username}`)
					.addField('Download as', `[jpeg](${jpeg}) | [png](${png}) | [webp](${webp})`)
					.setColor(color.Vibrant.hex)
					.setImage(user.user.avatarURL({size: 1024, dynamic: true}))
					.setURL(png);
			}
			wait.delete();
			message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
		} catch(error) {
			console.log(error);
			message.reply('An error occurred!').then(x => {
				setTimeout(() => {
					message.delete();
					x.delete();
				}, 4000);
			});
		}
	},
};