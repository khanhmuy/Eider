const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const chalk = require('chalk');
module.exports = {
	name: 'help',
	description: 'Help Command',
	usage: 'help [command]',
	cooldown: 2,
	async execute(client, message, args) {
		const prefix = client.data.get(`guild.${message.guild.id}.prefix`);
		if (!args[0]) {
			const embed = new MessageEmbed()
				.setColor('#C0DDFF')
				.setTitle('Commands')
				.setDescription(`Run \`${prefix}help [command]\` to see command info.`)
				.setThumbnail(client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
				.setTimestamp()
				.setFooter('Last updated');
			const commandFolders = fs.readdirSync('./commands');
			for (const folder of commandFolders) {
				if (folder.endsWith('.js')) {
					console.log(chalk.red(`File (${folder}) not in subdirectory, please move it. File has been ignored.`));
					return;
				}
				const array = [ ];
				const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
				for (const file of commandFiles) {
					const command = require(`../../commands/${folder}/${file}`);
					array.push(`\`${prefix}${command.name}\``);
				}
				embed.addField(folder, array.join(', '), true);
			}
			message.reply({ embeds: [ embed ], allowedMentions: { repliedUser: false } });
		} else {
			const search = args.join(' ');
			const results = new Array();
			const categoryDirectories = new Array();
			fs.readdirSync('./commands').forEach(c => categoryDirectories[categoryDirectories.length] = c);
			categoryDirectories.forEach(categoryName => {
				const cmdFileNames = fs.readdirSync(`./commands/${categoryName}`);
				cmdFileNames.forEach(cmdName => {
					const cmd = require(`./../${categoryName}/${cmdName}`);
					if (cmd.hidden && !cmd.searchable) return;
					if (cmd.name.includes(search)) return results[results.length] = cmd;
					if (cmd.aliases) if (cmd.aliases.includes(search)) return results[results.length] = cmd;
					if (cmd.description) if (cmd.description.includes(search)) return results[results.length] = cmd;
				});
			});
			if (!results[0]) return message.reply({content: 'I can\'t find that command!', allowedMentions: { repliedUser: false }});
			const names = new Array();
			results.forEach(x=>names[names.length] = `${names.length + 1}. ${x.name}`);

			let aliases = [ ];
			let usage = '';
			const command = results[0];
			if (command.aliases) {
				for (const alias in command.aliases) {
					aliases.push(`\`${prefix + command.aliases[alias]}\``);
				}
				aliases = aliases.join(', ');
			} else {
				aliases = `No aliases exist for ${prefix + command.name}`;
			}
			if (command.usage) {
				usage = `\`${prefix + command.usage}\``;
			} else {usage = 'Not Provided';}
			try {
			const embed = new MessageEmbed()
				.setTitle(`${prefix + command.name}`)
				.setThumbnail(client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
				.setDescription(command.description)
				.addField('Aliases', aliases, true)
				.addField('Usage', usage, true)
				.setColor('#C0DDFF')
				.setTimestamp()
				.setFooter('Last updated');
			message.reply({ embeds: [ embed ], allowedMentions: { repliedUser: false } });
			} catch (err) {
				console.log(err);
			}
		}
	},
};