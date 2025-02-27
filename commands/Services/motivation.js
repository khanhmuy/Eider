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
        axios.get('https://inspiration.goprogram.ai/')
        .then(function(response) {
            embed = new MessageEmbed()
                .setTitle('Motivation for you:')
                .setColor('BLUE')
                .setDescription(response.data.quote)
                .addField('Author:', response.data.author)
                .setFooter('Requested by ' + message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
        })
        .catch(function(error) {
            message.reply('Something went wrong, try again later.').then(x => {
                setTimeout(() => {
                    message.delete();
                    x.delete();
                }, 4000);
            });
        })
    },
};