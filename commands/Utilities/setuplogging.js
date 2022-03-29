const {MessageEmbed, Permissions} = require('discord.js');
module.exports = {
    name: 'loggingsetup',
    description: 'Setup logging for this guild',
    usage: 'loggingsetup <channel>',
    cooldown: 10,
    args: 1,
    permissions: [Permissions.FLAGS.ADMINISTRATOR],
    async execute(client, message, args) {
        if (!args[0].match(/<#[0-9]+>/)) return message.reply('Thats not a channel!').then(x => {
            setTimeout(() => {
                message.delete();
                x.delete();
            }, 4000);
        });
        const channel = args[0].slice(2, -1);
        client.data.ensure(`guild.${message.guild.id}.logChannel`, channel);
        client.data.set(`guild.${message.guild.id}.logChannel`, channel);
        const replyChannel = ('<#' + client.data.get(`guild.${message.guild.id}.logChannel`) + '>');
        const embed = new MessageEmbed()
            .setTitle('Logging channel is now')
            .setColor('GREEN')
            .setTimestamp()
            .setDescription(replyChannel);
        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    }
};