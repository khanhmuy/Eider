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
        } catch(error) {
            console.log(error);
        }
    },
};