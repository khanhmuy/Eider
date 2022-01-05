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
            if (!args[0]) return message.reply('Please enter a search query!');
            const input = '' + args
            const query = input.split(' ').join('%20');
            const wait = await message.channel.send('Searching...');
            const url = `http://api.urbandictionary.com/v0/define?term=${query}`;
            const { data } = await axios.get(url);
            if (!data.list[0]) return message.reply('No results found!');
            const embed = new MessageEmbed()
                .setTitle(`Urban Dictionary: ${data.list[0].word}`)
                .setDescription(data.list[0].definition)
                .addFields(
                    { name: 'Example', value: '' + data.list[0].example },
                    { name: 'Author', value: '' + data.list[0].author, inline: true },
                    { name: 'Thumbs up', value: '' + data.list[0].thumbs_up, inline: true },
                    { name: 'Thumbs down', value: '' + data.list[0].thumbs_down, inline: true },
                    { name: 'Link', value: '' + data.list[0].permalink }
                )
                .setColor('#EFFF00')
                .setFooter('Requested by ' + message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp();
            wait.delete();
            message.reply({ embeds: [embed] });
        } catch {
            message.reply('An error occured! Please try again later!');
        }
    },
};