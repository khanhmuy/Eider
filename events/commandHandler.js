const { Collection, MessageEmbed } = require('discord.js');

module.exports = {
	name: 'messageCreate',
	on: true,
	execute(client, message) {
		// Set prefix
		client.data.ensure(`guild.${message.guild.id}.prefix`, ',');

		const prefix = client.data.get(`guild.${message.guild.id}.prefix`);

		if (!message.content.startsWith(prefix) || message.author.bot) return;

		// Define command and args
		let args = message.content.slice(prefix.length).split(/ +/);
		const commandName = args.shift().toLowerCase();

		const command = client.commands.get(commandName)
			|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
		if (!command) return;

		if (!client.data.get('cmdCounterTotal')) client.data.set('cmdCounterTotal', 0);
		try {
			client.data.set('cmdCounterTotal', parseInt(client.data.get('cmdCounterTotal')) + 1);
		} catch (err) {
			console.log('Can no longer store command count!');
		}

		// Args system
		const usage = `\`${prefix + command.usage}\``;
		if (command.args && !args.length) return message.reply({content: `That command requires arguments! The correct usage is: ${usage}`, allowedMentions: { repliedUser: false }});
		if (command.args && !args[command.args - 1] && command.args != 'full') return message.reply({content: `That command requires ${command.args} arguments! The correct usage is: ${usage}`, allowedMentions: { repliedUser: false }});
		if (command.args === 'full') args = message.content.slice(prefix.length).slice(commandName.length);

		// Check if command is guild only
		if (command.guildOnly === true && message.guild === null) {
			return message.reply({content: 'That command is guild only!', allowedMentions: { repliedUser: false }});
		}

		// Permissions system
		if (command.permissions) {
			console.log(message.member.permissions.has(command.permissions));
			if (message.member.permissions.has(command.permissions) === false) {
				return message.reply('You don\'t have the permission to run that command!');
			}
		}

		// Cooldowns system
		const { cooldowns } = client;
		if (!cooldowns.has(command.name)) cooldowns.set(command.name, new Collection());
		const now = Date.now();
		const timestamps = cooldowns.get(command.name);
		const cooldownAmount = (command.cooldown || 0.5) * 1000;
		if (timestamps.has(message.author.id)) {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;
				return message.reply({content: `\`${prefix + commandName}\` is on cooldown for ${timeLeft.toFixed(1)} more second(s)`, allowedMentions: { repliedUser: false }});
			}
		}
		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

		// Run Command
		try {
			command.execute(client, message, args);
		} catch (err) {
			try {
				const embed = new MessageEmbed()
					.setTitle('Error')
					.setDescription(`${err}`)
					.setThumbnail('https://images-ext-1.discordapp.net/external/9yiAQ7ZAI3Rw8ai2p1uGMsaBIQ1roOA4K-ZrGbd0P_8/https/cdn1.iconfinder.com/data/icons/web-essentials-circle-style/48/delete-512.png?width=461&height=461')
					.setColor('RED')
					.setTimestamp();
				message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
				console.log(err)
			} catch (err) {
				console.log(err);
			}
		}
	},
};