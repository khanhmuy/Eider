const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'messageCreate',
	execute(client, message) {
		if (!message.guild || message.author.bot) return;
		client.data.ensure(`guild.${message.guild.id}.prefix`, ',');

		const prefix = client.data.get(`guild.${message.guild.id}.prefix`);
		if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) {
			const about = new MessageEmbed()
				.setTitle('Hi! I\'m **Eider**. A fully free and open source Discord bot.')
				.setDescription('I\'m a Discord Bot made by CallMeEcho#0253 and modified by [hmuy#4638](https://discord.com/users/272388882539085824) on `v1`\'s code, built with [Node.js](https://nodejs.org) and [Discord.js](https://discord.js.org).\nMy prefix is currently `' + prefix + '`')
				.setThumbnail('https://cdn.discordapp.com/attachments/858855894204678206/874231112686247956/eider-animate.gif')
				.setColor('#C0DDFF')
				.addField('To get started:', 'Use `' + prefix + 'help` to see all my commands.')
				.setFooter('Thank you for adding Eider to your server(s), we really appreciate it!');
			const invite = new MessageEmbed()
				.setTitle('Invite Eider to your servers!')
				.setColor('#C0DDFF')
				.setDescription('[Click here to invite Eider to your servers!](https://discord.com/oauth2/authorize?client_id=882454061763412069&permissions=8&scope=bot)')
				.addField('You can also join our support server:', '[Click here to join our support server!](https://discord.gg/rKuH5TRDy9)')
			const github = new MessageEmbed()
				.setTitle('Eider\'s GitHub repositories')
				.setColor('#C0DDFF')
				.setDescription('[Click here to view eider_hmuy\'s GitHub repositiory!](https://github.com/khanhmuy/eider_hmuy)\n[Click here to view Eider\'s GitHub repositiory!](https://github.com/CallMeEchoCodes/Eider)')
			message.channel.send({ embeds: [ about, invite, github ] });
		}
	},
};