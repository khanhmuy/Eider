const axios = require('axios');
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'videoinfo',
    description: 'Get the information of a youtube video',
    usage: 'videoinfo [video_id]',
    cooldown: 5,
    aliases: ['videoinfo', 'ytvidinfo', 'vidinfo'],
    async execute(client, message, args) {
        let embed = '';
        if (!args[0]) {
            message.reply('Please provide a video id!');
        } else {
            const id = args[0];
            axios.get('https://returnyoutubedislikeapi.com/votes?videoId=' + id)
            .then(function(response) {
                embed = new MessageEmbed()
                .setTitle(`Video info of ` + id)
                .setColor('#FFC0DD')
                .setTimestamp()
                .addFields(
                    { name: 'Date created', value: "" + response.data.dateCreated },
                    { name: 'Views', value: "" + response.data.viewCount, inline: true },
                    { name: 'Dislikes', value: "" + response.data.dislikes, inline: true },
                    { name: 'Likes', value: "" + response.data.likes, inline: true },
                    { name: 'Ratio', value: "" + response.data.rating, inline: true },
                )
            message.reply({ embeds: [embed] });
            })
        }
    },
};