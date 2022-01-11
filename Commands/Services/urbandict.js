const axios = require('axios');
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'urbandict',
    description: 'Search the Urban Dictionary',
    cooldown: 2,
    usage: 'urban <query>',
    aliases: ['ud', 'urbandictionary', 'urban'],
    async execute(client, message, args) {
        try {
            if (!args[0]) return message.reply('Please enter a search query!').then(x => {
                setTimeout(() => {
                    message.delete();
                    x.delete();
                }, 4000);
            });
            const input = '' + args
            const query = input.split(' ').join('%20');
            const wait = await message.channel.send('Searching...');
            const url = `http://api.urbandictionary.com/v0/define?term=${query}`;
            const { data } = await axios.get(url);
            if (!data.list[0]) return message.reply('No results found!').then(x => {
                wait.delete();
                setTimeout(() => {
                    message.delete();
                    x.delete();
                }, 4000);
            });
            const embed = new MessageEmbed()
                .setTitle(`Definition of: ${data.list[0].word}`)
                .setDescription(`${data.list[0].definition}`)
                .setURL(data.list[0].permalink)
                .addFields(
                    { name: 'Example', value: '' + data.list[0].example },
                    { name: '👍', value: '' + data.list[0].thumbs_up, inline: true },
                    { name: '👎', value: '' + data.list[0].thumbs_down, inline: true },
                    { name: 'Author', value: '' + data.list[0].author, inline: true },
                    { name: 'Link', value: '' + data.list[0].permalink }
                )
                .setColor('#EFFF00')
                .setFooter('Requested by ' + message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp();
            wait.delete();
            message.reply({ embeds: [embed] });
        } catch {
            message.reply('An error occured! Please try again later!').then(x => {
                setTimeout(() => {
                    message.delete();
                    x.delete();
                }, 4000);
            });
        }
    },
};