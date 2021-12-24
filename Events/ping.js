const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'messageCreate',
	execute(client, message) {
		if (!message.guild || message.author.bot) return;
		client.data.ensure(`guild.${message.guild.id}.prefix`, '!');

		const prefix = client.data.get(`guild.${message.guild.id}.prefix`);
		if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) {
			const embed = new MessageEmbed()
				.setTitle('Hi! I\'m **Eider**. A fully free and open source Discord bot.')
				.setDescription('I\'m a Discord Bot made by CallMeEcho#0253 and modified by [hmuy#4638](https://discord.com/users/272388882539085824), built with [Node.js](https://nodejs.org) and [Discord.js](https://discord.js.org).\n')
				.setThumbnail('https://cdn.discordapp.com/attachments/858855894204678206/874231112686247956/eider-animate.gif')
				.setColor('BLURPLE')
				.addFields(
					{ name: 'To get started:', value: 'Use `' + prefix + 'help` to see all my commands.' },
					{ name: 'Invite link:', value: 'https://tiny.cc/eider_hmuy'},
				)
			message.channel.send({ embeds: [ embed ] });
		}
	},
};