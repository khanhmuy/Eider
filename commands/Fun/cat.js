const axios = require('axios');
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'cat',
    description: 'Sends a random cat image!',
    usage: 'cat',
    cooldown: 2,
    aliases: [ 'kitty', 'kitten', 'kitties' ],
    async execute(client, message) {
        let embed = '';
        const wait = await message.channel.send('Fetching...');
        axios.get('https://aws.random.cat/meow')
        .then(function(response) {
            embed = new MessageEmbed()
                .setColor('BLUE')
                .setTimestamp()
                .setImage(response.data.file)
                .addField('Requested by ', message.author.username)
                .setFooter('Source: ' + response.data.file)
        wait.delete();
        message.reply({ embeds: [embed] });
        })
        .catch(function(error) {
            message.reply('Something went wrong, try again later.');
        })
    },
};