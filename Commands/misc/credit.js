const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'credits',
    description: 'Acknowledgements of people who have helped me in the development of this bot.',
    aliases: ['credits', 'acknowledgements', 'credit'],
    usage: 'credits',
    cooldown: 2,
    execute(client, message) {
        let embed = '';
        embed = new MessageEmbed()
            .setTitle('Credits')
            .setDescription('I would like to thank people who helped me in the development of this bot.')
            .setColor('#AEC6CF')
            .setTimestamp()
            .addFields(
                { name: '[CallMeEcho](https://github.com/CallMeEchoCodes)', value: 'The creator of this bot, who also helped me a lot in the early stages of learning Discord bot development.' },
                { name: '[llsc12](https://github.com/llsc12)', value: 'For helping me when I have issues with development in general, the developer of ytinfo api used in `videoinfo` command.' },
                { name: 'Eider is also somewhat based off of', value: '[Aquacious](https://github.com/Aquacious/Aquacious) :trol:' }
            )
        message.channel.send({ embeds: [embed] });
    }
};