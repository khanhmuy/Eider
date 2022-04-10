const axios = require('axios');
const Vibrant = require('node-vibrant');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
    name: 'dog',
    description: 'Sends a random dog image!',
    usage: 'dog',
    cooldown: 2,
    aliases: [ 'doggo', 'puppy' ],
    async execute(client, message) {
        try {
        const wait = await message.channel.send('Fetching...');
        const res = await axios.get('https://dog.ceo/api/breeds/image/random')
        let color = null
        color = await Vibrant.from(res.data.message).getPalette()
        color = color.Vibrant.hex
        const embed = new MessageEmbed()
            .setTitle('Random Dog!')
            .setColor(color)
            .setTimestamp()
            .setImage(res.data.message)
            .setURL(res.data.message)
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setStyle('LINK')
                    .setURL(res.data.message)
                    .setLabel('View Orginal Image')
            )
        message.reply({ embeds: [embed], components: [row], allowedMentions: { repliedUser: false } });
        wait.delete();
        }
        catch (error) {
            wait.delete();
            console.log(error);
            message.reply('Something went wrong, try again later.').then(x => {
                setTimeout(() => {
                    x.delete();
                }, 4000)
            });
        }
    },
};