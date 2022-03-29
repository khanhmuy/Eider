const Uwuifier = require('uwuifier');
const uwuifier = new Uwuifier();
const {MessageEmbed} = require('discord.js'); 
module.exports = {
    name: 'uwuifier',
    description: 'uwuifi some text',
    usage: 'uwuifier <text>',
    cooldown: 2,
    aliases: ['uwu', 'uwuify'],
    async execute(client, message, args) {
        try {
            const text = args.join(' ');
            if (!text) return message.reply('You need to provide some text!');
            else {
                const uwuified = uwuifier.uwuifySentence(text);
                const embed = new MessageEmbed()
                    .setAuthor(message.author.username, `${message.author.displayAvatarURL({ dynamic: true })}?size=1024`)
                    .setColor('BLUE')
                    .setDescription(uwuified);
                message.delete();
                message.channel.send({ embeds: [embed] });
            }
        }
        catch (error) {
            console.log(error);
            message.reply('There was an error trying to execute that command!');
        }
    }
};