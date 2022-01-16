const { MessageEmbed } = require('discord.js');
const axios = require('axios');
module.exports = {
    name: 'clyde',
    description: 'Make Clyde (Discord client\'s fake bot) say something.',
    usage: 'clyde <message>',
    cooldown: 3,
    async execute(client, message, args) {
        try {
            if (!args[0]) {return message.reply('You need to provide some text.');}
            console.log(args.join('%20'));
            const res = await axios.get('https://nekobot.xyz/api/imagegen?type=clyde&text=' + args.join('%20'));
            message.channel.send(res.data.message);
        } catch {
            message.reply('Something went wrong! Please try again later, or try using English maybe').then(x => {
                setTimeout(() => {
                    x.delete();
                }, 4000);
            });
        }
    }
};