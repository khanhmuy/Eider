// i have literally nothing else to add pls send help
const axios = require('axios');
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'activity',
    description: 'Sends a random activity for you to do!',
    usage: 'activity',
    cooldown: 2,
    aliases: [ 'activities' ],
    async execute(client, message) {
        let embed = '';
        axios.get('https://www.boredapi.com/api/activity/')
        .then(function(response) {
            embed = new MessageEmbed()
                .setTitle('Activity for you:')
                .setColor('#6BA3FF')
                .setDescription(response.data.activity)
                .addField('Type:', response.data.type)
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