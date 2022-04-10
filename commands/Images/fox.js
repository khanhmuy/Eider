const axios = require('axios');
const Vibrant = require('node-vibrant');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
    name: 'fox',
    description: 'Random fox images!',
    usage: 'fox',
    cooldown: 4,
    aliases: ['foxes'],
    async execute(client, message) {
        try {
            const wait = await message.channel.send('Fetching...');
            const res = await axios.get('https://randomfox.ca/floof/')
            let color = null
            color = await Vibrant.from(res.data.image).getPalette()
            color = color.Vibrant.hex
            const embed = new MessageEmbed()
                .setTitle('Random Fox!')
                .setImage(res.data.image)
                .setColor(color)
                .setTimestamp()
                .setURL(res.data.link)
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setStyle('LINK')
                        .setURL(res.data.link)
                        .setLabel('View Orginal Image')
                )
            message.reply({ embeds: [embed], components: [row], allowedMentions: { repliedUser: false } });
            wait.delete();
        } catch (error) {
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