const { Permissions, MessageEmbed } = require('discord.js');

module.exports = {
	name: 'emojisteal',
	aliases: [ 'emojigrab', 'emotesteal', 'emotegrab', 'stealemoji', 'stealemote' ],
	description: 'Steal emojis with or without nitro!',
	usage: 'emojisteal [emojiurl] [emojiname]',
	cooldown: 2,
	permissions: [ Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS ],
	async execute(client, message, args) {
		function deniedEmbed(err) {
			const embed = new MessageEmbed()
				.setTitle('Error')
				.setDescription(err)
				.setThumbnail('https://images-ext-1.discordapp.net/external/9yiAQ7ZAI3Rw8ai2p1uGMsaBIQ1roOA4K-ZrGbd0P_8/https/cdn1.iconfinder.com/data/icons/web-essentials-circle-style/48/delete-512.png?width=461&height=461')
				.setColor('RED')
				.setTimestamp();
			return embed;
		}
		const prefix = client.data.get(`guild.${message.guild.id}.prefix`);
		const commandName = message.content.slice(prefix.length).split(' ').shift().toLowerCase();
		if (!args[0]) {
			const embed = new MessageEmbed()
				.setTitle('Emoji stealer')
				.setColor('ORANGE')
				.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
				.setDescription('Add reactions to this message to add them to your server')
				.setFooter(`Don't have nitro? Use ${prefix}${commandName} <url> <emojiname> \nAdd single emojis fast? Use ${prefix}${commandName} <emoji>`);
			message.channel.send({ embeds: [embed] });
		} else if (args[0].includes('https://')) {
			if (!args[1]) return message.channel.send({ embeds: [deniedEmbed('You need to specify a name when adding emojis via url')] })
			if (message.guild.emojis.cache.find(emoji => emoji.name == args[1])) return message.channel.send({ embeds: [deniedEmbed(`An emoji with the name :${args[1]}: already exists`)] });
			message.guild.emojis.create(args[0], args[1]).catch(err => { return message.channel.send({ embeds: [deniedEmbed(`There was an unknown issue. \n${err}`)] })});
			message.reply(`Stolen :${args[1]}:`).then(x => {
				setTimeout(() => {
					message.delete();
					x.delete();
				}, 4000);
			});
		}
		if (!args[1] && args[0]) {
			const msg = args[0].match(/<a?:.+:\d+>/gm);
			let url = '';
			const emoji = '';
			if (emoji == /<:.+:(\d+)>/gm.exec(msg)) {
				url = 'https://cdn.discordapp.com/emojis/' + emoji[1] + '.png?v=1';
			} else if (emoji == /<a:.+:(\d+)>/gm.exec(msg)) {
				url = 'https://cdn.discordapp.com/emojis/' + emoji[1] + '.gif?v=1';
			}
			if (!emoji) return message.channel.send({ embeds: [deniedEmbed('There was no emoji found.')] })
			if (!emoji[0]) return message.channel.send({ embeds: [deniedEmbed('There was an unknown issue.')] });
			let sliceamount = 2;
			if (emoji[0].slice(1, 2) == 'a') sliceamount = 3;
			const emojiname = emoji[0].slice(sliceamount, (emoji[0].search(emoji[1])) - 1);
			if (message.guild.emojis.cache.find(emote => emote.name == emojiname)) return message.channel.send({ embeds: [deniedEmbed(`An emoji with the name :${emojiname}: already exists`)] });
			message.guild.emojis.create(url, emojiname).catch(err => {message.channel.send({ embeds: [deniedEmbed(`An error has occurred. \n${err}`)] });});
			message.reply(`Stolen :${emojiname}:`).then(x => {
				setTimeout(() => {
					message.delete();
					x.delete();
				}, 4000);
			});
		}
	},
};