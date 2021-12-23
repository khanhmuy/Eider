const axios = require('axios');
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'cat',
    description: 'Sends a random cat image!',
    usage: 'cat',
    cooldown: 5,
    aliases: [ 'kitty', 'kitten', 'kitties' ],
    async execute(client, message) {
        let embed = '';
        axios.get('https://aws.random.cat/meow')
        .then(function(response) {
            embed = new MessageEmbed()
            .setColor('BLUE')
            .setTimestamp()
            .setImage(response.data.file)
            .addField('Requested by ', message.author.username)
            .setFooter('OP: ' + response.data.file)
        message.reply({ embeds: [embed] });
        })
    },
};