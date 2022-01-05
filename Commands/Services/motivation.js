const axios = require('axios');
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'motivation',
    description: 'Quotes to motivate or inspire you!',
    usage: 'motivation',
    cooldown: 2,
    aliases: [ 'inspire', 'quotes', 'quote' ],
    async execute(client, message) {
        let embed = '';
        const wait = await message.channel.send('Fetching...');
        axios.get('https://inspiration.goprogram.ai/')
        .then(function(response) {
            embed = new MessageEmbed()
                .setTitle('Motivation for you:')
                .setColor('BLUE')
                .setDescription(response.data.quote)
                .addField('Author:', response.data.author)
                .setFooter('Requested by ' + message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
        wait.delete();
        message.reply({ embeds: [embed] });
        })
        .catch(function(error) {
            message.reply('Something went wrong, try again later.');
        })
    },
};