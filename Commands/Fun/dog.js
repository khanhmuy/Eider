const axios = require('axios');
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'dog',
    description: 'Sends a random dog image!',
    usage: 'dog',
    cooldown: 5,
    aliases: [ 'doggo', 'puppy' ],
    async execute(client, message) {
        let embed = '';
        axios.get('https://dog.ceo/api/breeds/image/random')
        .then(function(response) {
            embed = new MessageEmbed()
            .setColor('BLUE')
            .setTimestamp()
            .setImage(response.data.message)
            .addField('Requested by ', message.author.username)
            .setFooter('OP: ' + response.data.message)
        message.reply({ embeds: [embed] });
        })
    },
};