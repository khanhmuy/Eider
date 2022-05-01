const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'credits',
    description: 'A shoutout to everyone who contributed!',
    aliases: ['credits', 'acknowledgements', 'credit'],
    usage: 'credits',
    cooldown: 2,
    execute(client, message) {
        let embed = '';
        embed = new MessageEmbed()
            .setTitle('Credits')
            .setDescription('Thanks to all the lovely people below, this bot was born!')
            .setColor('#C0DDFF')
            .setThumbnail(client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            .addFields(
                { name: 'CallMeEcho', value: 'The creator of this bot, who also helped me a lot in the early stages of learning Discord bot development.\n\n[Echo\'s GitHub](https://github.com/CallMeEchoCodes)' },
                { name: 'llsc12', value: 'For helping me when I have issues with development in general, the developer of [llsc12.ml](https://llsc12.ml) used in the `videoinfo` command.\n\n[llsc12\'s GitHub](https://github.com/llsc12)' },
                { name: 'API\'s used in this bot', value: '[PronounDB](https://pronoundb.org), [NASA\'s OpenAPIs](https://api.nasa.gov/), [Inspiration API](https://inspiration.goprogram.ai/), [Urban Dictionary API](https://www.urbandictionary.com/), [Useless Facts API](https://uselessfacts.jsph.pl/random.json?language=en), [Bored API](https://www.boredapi.com/api/activity/), [Return Youtube Dislikes API](https://returnyoutubedislike.com).'},
                { name: 'Eider is also somewhat based off of', value: '[Aquacious](https://github.com/Aquacious/Aquacious) :trol:' },
                { name: 'And a big, big thanks to Michele for letting me be hosted on their VPS', value: '\n[Michele\'s GitHub](https://github.com/Micheleeeeeeee)' }
            )
        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    }
};