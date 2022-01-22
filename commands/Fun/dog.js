const axios = require('axios');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
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
                .setURL(response.data.message)
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setStyle('LINK')
                        .setURL(response.data.message)
                        .setLabel('View Orginal Image')
                )
        wait.delete();
        message.reply({ embeds: [embed], components: [row], allowedMentions: { repliedUser: false } });
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