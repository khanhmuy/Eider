const axios = require('axios');
module.exports = {
    name: 'magik',
    description: 'magik-ify a profile picture',
    usage: 'magik [user]',
    cooldown: 3,
    async execute(client, message, args) {
        try {
            const wait = await message.channel.send('give me a second please...');
            let pfp = '';
            if(!args[0]) {
                pfp = message.author.displayAvatarURL({ format: 'png', size: 1024 });
            } if(args[0]) {
                pfp = message.mentions.users.first().displayAvatarURL({size: 1024, format: 'png'});
            }
            const image = await axios.get(`https://nekobot.xyz/api/imagegen?type=magik&image=${pfp}`);
            wait.delete();
            message.reply(image.data.message);
        } catch(error) {
            wait.delete();
            return message.reply('Something went wrong! Please try again later!').then(x => {
                setTimeout(() => {
                    x.delete();
                }, 4000);
            });
        }
    },
};