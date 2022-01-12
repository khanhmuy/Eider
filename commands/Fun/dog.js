const axios = require('axios');
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'dog',
    description: 'Sends a random dog image!',
    usage: 'dog',
    cooldown: 2,
    aliases: [ 'doggo', 'puppy' ],
    async execute(client, message) {
        const wait = await message.channel.send('Fetching...');
        let embed = '';
        axios.get('https://dog.ceo/api/breeds/image/random')
        .then(function(response) {
            embed = new MessageEmbed()
            .setColor('BLUE')
            .setTimestamp()
            .setImage(response.data.message)
            .addField('Requested by ', message.author.username)
            .setFooter('Source: ' + response.data.message)
        wait.delete();
        message.reply({ embeds: [embed] });
        })
        .catch(function(error) {
            message.reply('Something went wrong, try again later.');
        })
    },
};