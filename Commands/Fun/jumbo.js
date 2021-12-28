// yes, cc Aquacious cuz i'm lazy: https://github.com/Aquacious/Aquacious/blob/main/commands/Chat/jumboEmoji.js
module.exports = {
    name: 'jumbo',
    description: 'enlarge an emoji',
    cooldown: 2,
    usage: 'jumbo <emoji> (must be a Discord emoji)',
    aliases: ['jumboemoji', 'jumboemote', 'bigemote', 'bigemoji'],
    async execute(client, message, args) {
        if (!args[0]) return message.reply('Emoji not found!');
        const msg = args[0].match(/<a?:.+:\d+>/gm)
        let url = '';
        if (emoji = /<:.+:(\d+)>/gm.exec(msg)) {
            url = "https://cdn.discordapp.com/emojis/" + emoji[1] + ".png?v=1?size=1500";
        } else if (emoji = /<a:.+:(\d+)>/gm.exec(msg)) {
            url = "https://cdn.discordapp.com/emojis/" + emoji[1] + ".gif?v=1?size=1500";
        } 
        if (url) {
            message.delete();
            message.channel.send(url);
        } if (!url) {
            message.reply('Invalid emoji!, might be a Unicode emoji')
        }
    }
};