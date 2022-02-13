const { MessageEmbed, Permissions } = require('discord.js');

module.exports = {
	name: 'prefix',
	description: 'Set this guilds prefix',
	cooldown: 5,
	permissions: [ Permissions.FLAGS.ADMINISTRATOR ],
	aliases: [ 'setprefix', 'guildprefix' ],
	usage: 'prefix <newprefix>',
	guildOnly: true,
	async execute(client, message, args) {
		let embed = '';
		if (!args[0]) {
			embed = new MessageEmbed()
				.setColor('BLUE')
				.setTitle('Prefix')
				.setDescription(`My current prefix is \`${client.data.get(`guild.${message.guild.id}.prefix`)}\``)
			message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
		} else {
			client.data.set(`guild.${message.guild.id}.prefix`, args[0]);
			embed = new MessageEmbed()
				.setColor('#00B300')
				.setTitle('Success!')
				.setDescription(`My prefix is now \`${client.data.get(`guild.${message.guild.id}.prefix`)}\` `);
			message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
		}
	},
};