const axios = require('axios');
const Vibrant = require('node-vibrant');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
    name: 'cat',
    description: 'Sends a random cat image!',
    usage: 'cat',
    cooldown: 2,
    aliases: [ 'kitty', 'kitten', 'kitties' ],
    async execute(client, message) {
        try {
        const wait = await message.channel.send('Fetching...');
        const res = await axios.get('https://aws.random.cat/meow')
        let color = null
        color = await Vibrant.from(res.data.file).getPalette()
        color = color.Vibrant.hex
        const embed = new MessageEmbed()
                .setTitle('Random Cat!')
                .setColor(color)
                .setTimestamp()
                .setImage(res.data.file)
                .setURL(res.data.file)
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setStyle('LINK')
                        .setURL(res.data.file)
                        .setLabel('View Orginal Image')
                )
        wait.delete();
        message.reply({ embeds: [embed], components: [row], allowedMentions: { repliedUser: false } });
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