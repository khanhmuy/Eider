const axios = require('axios');
const { MessageEmbed} = require('discord.js');
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
        const wait = await message.channel.send('Fetching...');
        axios.get('https://api.nasa.gov/planetary/apod?api_key=' + key)
        .then(function (response) {
            embed = new MessageEmbed()
                .setColor('#105BD8')
                .setTimestamp()
                .setTitle(response.data.title)
                .setImage(response.data.url)
                .setDescription(response.data.explanation)
                .addField('Image link:', '' + response.data.hdurl)
                .setFooter('Requested by ' + message.author.username)
            wait.delete();
            message.reply({ embeds: [embed] });
        })
        .catch(function (error) {
            message.reply('There was an error fetching the image. Please try again later.');
          })
    },
};