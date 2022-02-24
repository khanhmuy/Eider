const {MessageEmbed} = require('discord.js');
const axios = require('axios');
module.exports = {
    name: 'messageCreate',
    async execute(client, message) {
        try {
            const words = await axios.get('https://raw.githubusercontent.com/LillieWeeb001/Anti-Scam-Json-List/main/antiscam.json')
            words.data.scamjburls.forEach(word => {
                if (message.content.includes(word)) {
                    message.delete();
                    const mention = '<@!' + message.author.id + '>';
                    const embed = new MessageEmbed()
                        .setTitle('Fake or scam jailbreak detected!')
                        .setDescription('Your message contained the link to a fake jailbreak (' + word + ').\nIf you installed this jailbreak, remove it from your device immediately and try to get a refund if you paid for it. Jailbreaks never cost money and will not ask for any form of payment or survey to install them.')
                        .setColor('#ff0000')
                    message.channel.send( {content: mention, embeds: [embed]} )
                    
                }
            });
            //words.data.scamdiscordurls.forEach(word => {
                //if (message.content.includes(word)) {
                    //message.delete();
                    //const mention = '<@!' + message.author.id + '>';
                    //const embed = new MessageEmbed()
                        //.setTitle('Fake or scam discord detected!')
                        //.setDescription('Your message contained the link to a Discord scam link (' + word + '). Your message has been removed.')
                        //.setColor('#ff0000')
                    //message.channel.send( {content: mention, embeds: [embed]} )
                //}
            //});
            words.data.scamideviceunlockurls.forEach(word => {
                if (message.content.includes(word)) {
                    message.delete();
                    const mention = '<@!' + message.author.id + '>';
                    const embed = new MessageEmbed()
                        .setTitle('Fake or scam iDevice unlock detected!')
                        .setDescription('Your message contained the link to a fake / scam iDevice unlock (' + word + '). Your message will be removed')
                        .setColor('#ff0000')
                    message.channel.send( {content: mention, embeds: [embed]} )
                }
            });
            const whoasked = {
                whoasked: [
                    "ai hỏi",
                    "who asked",
                    "who fucking asked",
                    "whoasked",
                    "whofuckingasked"
                ]
            };
            whoasked.whoasked.forEach(word => {
                if (message.content.includes(word)) {
                    message.reply({content: 'Ai mượn bạn nói mà cái địt mẹ bạn lúc lồn nào cũng "aI hỎi?". Là tôi, tôi đã hỏi. Thật là một cực hình khi phải nặng gánh trách nhiệm của một kẻ tội đồ đã đưa ra câu hỏi và giấu mình vào ngôi thứ ba. Trách nhiệm nặng như quả đất, đặt vào đôi bờ vai nhỏ bé của tôi. Nó như đè nát thân tâm tôi, nó rằng xé con người tôi bởi sức nặng khủng khiếp của Kẻ Đã Hỏi. Thật là một cực hình, quả là địa ngục trần gian, đúng là tra tấn man rợn. Nhưng cuối cùng, tôi cũng được giải phóng khỏi chuỗi ngày đau khổ đó. Đúng, là tôi, tôi đã hỏi, có vấn đề gì không?', allowedMentions: { repliedUser: false }})
                }
            })
        } catch(error) {
            console.log(error);
        }
    },
};