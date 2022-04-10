const axios = require('axios');
const Vibrant = require('node-vibrant');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
    name: 'waifu',
    description: 'Sends a random (SFW) waifu image! (credit where credit is due: LillieWeeb001 on GitHub)',
    usage: 'waifu',
    cooldown: 3,
    async execute (client, message) {
        try {
            const wait = await message.channel.send('Fetching...');
            const res = await axios.get('https://api.waifu.pics/sfw/waifu')  
            let color = null
            color = await Vibrant.from(res.data.url).getPalette()
            color = color.Vibrant.hex
            const embed = new MessageEmbed()
                .setTitle('Waifu image')
                .setColor(color)
                .setTimestamp()
                .setImage(res.data.url)
                .setURL(res.data.url)
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setStyle('LINK')
                        .setURL(res.data.url)
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