const axios = require('axios');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
    name: 'apod',
    description: 'Get a NASA Astronomy Picture of the Day',
    usage: 'apod',
    cooldown: 2,
    aliases: ['astronomyoftheday', 'astronomyofday', 'nasaapod'],
    async execute(client, message) {
        let embed = '';
        const apikey = process.env.NASA_API_KEY
        // if no api key is supplied, use the demo key (rate limited)
        if (apikey === undefined) {key = 'DEMO_KEY'}
        else {key = apikey}
        const wait = await message.channel.send('Please wait...');
        axios.get('https://api.nasa.gov/planetary/apod?api_key=' + key)
        .then(function (response) {
            var hdurl = response.data.hdurl;
            if (hdurl == undefined) {
                hdurl = 'https://hmuy.ml/404'
            }
            embed = new MessageEmbed()
                .setColor('#105BD8')
                .setTimestamp()
                .setTitle(response.data.title)
                .setImage(response.data.url)
                .setDescription(response.data.explanation)
                .setURL(response.data.url)
                const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setStyle('LINK')
                            .setURL(hdurl)
                            .setLabel('View Full Image')
                    )
                message.reply({ embeds: [embed], components: [row], allowedMentions: { repliedUser: false } });
                wait.delete();
        })
        .catch(function (error) {
            console.log(error);
            wait.delete();
            message.reply('There was an error loading the image. Please try again later.').then (x => {
                setTimeout(() => {
                    message.delete();
                    x.delete();
                }, 4000);
            });
          })
    },
};