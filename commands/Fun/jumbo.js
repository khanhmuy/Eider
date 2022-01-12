// yes, cc Aquacious cuz i'm lazy: https://github.com/Aquacious/Aquacious/blob/main/commands/Chat/jumboEmoji.js
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'jumbo',
    description: 'enlarge an emoji',
    cooldown: 2,
    usage: 'jumbo <emoji> (must be a Discord emoji)',
    aliases: ['jumboemoji', 'jumboemote', 'bigemote', 'bigemoji'],
    async execute(client, message, args) {
        if (!args[0]) return message.reply('Emoji not found!').then(x => {
            setTimeout(() => {
                message.delete();
                x.delete();
            }, 4000);
        });
        const msg = args[0].match(/<a?:.+:\d+>/gm)
        let url = '';
        if (emoji = /<:.+:(\d+)>/gm.exec(msg)) {
            url = "https://cdn.discordapp.com/emojis/" + emoji[1] + ".png?v=1?size=1500";
        } else if (emoji = /<a:.+:(\d+)>/gm.exec(msg)) {
            url = "https://cdn.discordapp.com/emojis/" + emoji[1] + ".gif?v=1?size=1500";
        } 
        if (url) {
            let embed = '';
            embed = new MessageEmbed()
                .setColor('BLUE')
                .setAuthor(message.author.username, `${message.author.displayAvatarURL({ dynamic: true })}?size=1024`)
                .setImage(url)
            message.delete();
            message.channel.send({ embeds: [embed] });
        } if (!url) {
            message.reply('Invalid emoji!, might be a Unicode emoji')
        }
    }
};