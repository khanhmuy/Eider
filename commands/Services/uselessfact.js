const axios = require('axios');
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'uselessfact',
    description: 'Get a random useless fact, still true tho',
    usage: 'uselessfact',
    cooldown: 2,
    aliases: [ 'uselessfacts', 'trueig', 'trueiguess' ],
    async execute(client, message) {
        let embed = '';
        const wait = await message.channel.send('Fetching...');
        axios.get('https://uselessfacts.jsph.pl/random.json?language=en')
        .then(function(response) {
            source = '[' + response.data.source + '](' + response.data.source_url + ')';
            embed = new MessageEmbed()
                .setTitle('Useless fact:')
                .setColor('RANDOM')
                .setDescription(response.data.text)
                .setFooter('Requested by ' + message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
            wait.delete();
            message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
        })
        .catch(function(error) {
            message.reply('Something went wrong, try again later.').then(x => {
                setTimeout(() => {
                    message.delete();
                    x.delete();
                }, 4000);
            });
        })
    },
};