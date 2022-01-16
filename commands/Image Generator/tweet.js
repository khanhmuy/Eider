const {MessageEmbed} = require('discord.js');
const axios = require('axios');
module.exports = {
    name: 'tweet',
    description: 'pretend you\'re tweeting (i would use dankmemer\'s api but mf is broken',
    usage: 'tweet [user] <message>',
    cooldown: 3,
    async execute(client, message, args) {
        try {            
            const wait = await message.channel.send('plz hold on...');
            let user = args[0];
            let text = '';
            if (!args[0].match(/<@!*&*[0-9]+>/)) {
                user = message.author.username;
                text = args.join('%20');
            }
            if (!args[0].match(/<@!*&*[0-9]+>/) && args[1]) {
                user = message.author.username
                text = args.join('%20');
            } 
            if (args[0].match(/<@!*&*[0-9]+>/) && args[1]) {
                const id = args[0].split('<@!')[1].split('>')[0];
                user = client.users.cache.get(id).username;
                text = args.slice(1).join('%20');
            }
            const res = await axios.get(`https://nekobot.xyz/api/imagegen?type=tweet&username=${user}&text=${text}`); 
            wait.delete();
            message.channel.send(res.data.message);
        } catch(error) {
            console.log(error);
            wait.delete();
            message.reply('Something went wrong! Please try again later').then(x => {
                setTimeout(() => {
                    x.delete();
                }, 4000);
            });
        }
    }
};