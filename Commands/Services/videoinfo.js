const axios = require('axios');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
    name: 'videoinfo',
    description: 'Get the information of a youtube video',
    usage: 'videoinfo [video_id] or [url]',
    cooldown: 2,
    aliases: ['videoinfo', 'ytvidinfo', 'vidinfo'],
    async execute(client, message, args) {
        if (!args[0]) {
            message.reply('Please provide a video id!');
        } else {
            let embed = '';
            let id = ';'
            if (args[0].match(/https:\/\/www.youtube.com\/watch\?v=./)) {
                id = args[0].slice(32);
            } if (args[0].match(/https:\/\/youtu.be\/./)) {
                id = args[0].slice('https://youtu.be/'.length);
            } if (!args[0].match(/https:\/\/www.youtube.com\/watch\?v=./) && !args[0].match(/https:\/\/youtu.be\/./)) {
                id = args[0];
            }
            const wait = await message.channel.send('Getting video info...');
            try {
                const dislike = await axios.get('https://returnyoutubedislikeapi.com/votes?videoId=' + id);
                const dislikeCount = dislike.data.dislikes
                const info = await axios.get('https://llsc12.ml/api/v1/getInfo?url=https://youtu.be/' + id);
                const likeCount = info.data.videoDetails.likes;
                const views = info.data.videoDetails.viewCount;
                const title = info.data.videoDetails.title;
                const channel = info.data.videoDetails.ownerChannelName;
                const channelUrl = info.data.videoDetails.author.channel_url;
                const subs = info.data.videoDetails.author.subscriber_count;
                const uploadDate = dislike.data.dateCreated;
                const thumbnail = info.data.videoDetails.thumbnails[3].url;
                const link = 'https://www.youtube.com/watch?v=' + id;
                const rawDescription = info.data.videoDetails.description;
                const description = rawDescription.slice(0, 995) + ' (...)';
                const videoDownloadLink = "http://llsc12.ml/api/v2/download?url=https://www.youtube.com/watch?v=" + id;
                const audioDownloadLink = "http://llsc12.ml/api/v2/audio?url=https://youtu.be/" + id;
                embed = new MessageEmbed()
                    .setTitle('' + title)
                    .setColor('#FF0000')
                    .setURL(link)
                    .setThumbnail(thumbnail)
                    .setTimestamp()
                    .addFields(
                        { name: 'Date created: ', value: "" + uploadDate },
                        { name: 'Views:', value: "" + views, inline: true },
                        { name: 'Likes:', value: "" + likeCount, inline: true },
                        { name: 'Dislikes:', value: "" + dislikeCount, inline: true },
                        { name: 'Description:', value: '' + description},
                        { name: 'Channel: ', value: "" + '[' + channel + '](' + channelUrl + ')', inline: true },
                        { name: 'Subscribers: ', value: "" + subs , inline: true },
                        { name: 'Video link: ', value: '' + link },
                        { name: 'Download links:', value: '[Video](' + videoDownloadLink + ') | [Audio](' + audioDownloadLink + ')', inline: true }
                    )
                    .setFooter('Requested by: ' + message.author.username);
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