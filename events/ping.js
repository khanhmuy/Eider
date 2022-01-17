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
				.setDescription('I\'m a Discord Bot made by CallMeEcho#0253 and modified by [hmuy#4638](https://discord.com/users/272388882539085824), built with [Node.js](https://nodejs.org) and [Discord.js](https://discord.js.org).\nMy prefix is currently `' + prefix + '`')
				.setThumbnail('https://cdn.discordapp.com/attachments/858855894204678206/874231112686247956/eider-animate.gif')
				.setColor('#C0DDFF')
				.addField('To get started:', 'Use `' + prefix + 'help` to see all my commands.')
				.setFooter('Thank you for adding Eider, we really appreciate it!');
			const invite = new MessageEmbed()
				.setTitle('Invite Eider to your servers!')
				.setColor('#C0DDFF')
				.setDescription('[Click here to invite Eider to your servers!](https://hmuy.ml/eider)')
				.addField('You can also join our support server:', '[Click here to join our support server!](https://discord.gg/rKuH5TRDy9)')
				.setURL('https://hmuy.ml/eider')
			const github = new MessageEmbed()
				.setTitle('Eider\'s Github repositories')
				.setColor('#C0DDFF')
				.setDescription('[Click here to view Eider_hmuy\'s Github repositiory!](https://github.com/khanhmuy/eider_hmuy)\n[Click here to view Eider\'s Github repositiory!](https://github.com/CallMeEchoCodes/Eider)')

			message.channel.send({ embeds: [ about, invite, github ] });
		}
	},
};