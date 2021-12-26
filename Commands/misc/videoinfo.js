const axios = require('axios');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
    name: 'videoinfo',
    description: 'Get the information of a youtube video',
    usage: 'videoinfo [video_id]',
    cooldown: 2,
    aliases: ['videoinfo', 'ytvidinfo', 'vidinfo'],
    async execute(client, message, args) {
        let embed = '';
        if (!args[0]) {
            message.reply('Please provide a video id!');
        } else {
            let embed = '';
            const id = args[0];
            const wait = await message.channel.send('Getting video info...');
            try {
                const dislike = await axios.get('https://returnyoutubedislikeapi.com/votes?videoId=' + id);
                const dislikeCount = dislike.data.dislikes
                const info = await axios.get('https://llsc12.ml/api/v1/getInfo?url=https://youtu.be/' + id);
                const likeCount = info.data.videoDetails.likes;
                const views = info.data.videoDetails.viewCount;
                const title = info.data.videoDetails.title;
                const channel = info.data.videoDetails.ownerChannelName;
                const uploadDate = dislike.data.dateCreated;
                embed = new MessageEmbed()
                    .setTitle('Video info of ' + title)
                    .setColor('#FFC0DD')
                    .setTimestamp()
                    .addFields(
                        { name: 'Date created: ', value: "" + uploadDate },
                        { name: 'Views:', value: "" + views, inline: true },
                        { name: 'Likes:', value: "" + likeCount, inline: true },
                        { name: 'Dislikes:', value: "" + dislikeCount, inline: true },
                        { name: 'Channel: ', value: "" + channel },
                        { name: 'Video link: ', value: "https://www.youtube.com/watch?v=" + id }
                    )
                    .setFooter('Requested by: ' + message.author.username),
                    wait.delete();
                    message.reply({ embeds: [embed] });
            }
            catch (error) {
                wait.delete();
                message.reply('An error occurred! Please double check your video id!')
            }
            
        }
    },
};