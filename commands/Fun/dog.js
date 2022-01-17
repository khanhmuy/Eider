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
                .setTitle('Dog image')
                .setColor('BLUE')
                .setTimestamp()
                .setImage(response.data.message)
                .setFooter('Requested by ' + message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setURL(response.data.message)
        wait.delete();
        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
        })
        .catch(function(error) {
            message.reply('Something went wrong, try again later.').then(x => {
                setTimeout(() => {
                    x.delete();
                }, 4000)
            });
        })
    },
};