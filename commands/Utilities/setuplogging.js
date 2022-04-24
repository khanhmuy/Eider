const {MessageEmbed, Permissions} = require('discord.js');
module.exports = {
    name: 'loggingsetup',
    description: 'Setup logging for this guild',
    usage: 'loggingsetup <channel>',
    aliases: ['loggingsetup', 'setuplogging', 'setuplogs', 'logssetup'],
    cooldown: 10,
    args: 1,
    permissions: [Permissions.FLAGS.ADMINISTRATOR],
    async execute(client, message, args) {
        if (!args[0].match(/<#[0-9]+>/)) {
            if (args[0] = 'disable') {
                client.data.set(`guild.${message.guild.id}.logChannel`, null);
                message.reply('Logging has been disabled for this guild.');
            } else {
                message.reply('Please enter a valid channel!').then(x => {
                    setTimeout(() => {
                        message.delete();
                        x.delete();
                    }, 4000)
                });
            }
        } else {
            const channel = args[0].slice(2, -1);
            console.log(channel);
            client.data.ensure(`guild.${message.guild.id}.logChannel`, channel);
            client.data.set(`guild.${message.guild.id}.logChannel`, channel);
            const replyChannel = ('<#' + client.data.get(`guild.${message.guild.id}.logChannel`) + '>');
            const embed = new MessageEmbed()
                .setTitle('Success!')
                .setColor('GREEN')
                .setTimestamp()
                .setDescription(`Logging channel is now ${replyChannel}`);
            message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
        }
    }
};