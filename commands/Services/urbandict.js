const axios = require('axios');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
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
                    { name: 'Example', value: data.list[0].example.toString() },
                    { name: '👍', value: data.list[0].thumbs_up.toString(), inline: true },
                    { name: '👎', value: data.list[0].thumbs_down.toString(), inline: true },
                    { name: 'Author', value: data.list[0].author.toString(), inline: true },
                )
                .setColor('#EFFF00')
                .setThumbnail('https://i.imgur.com/VFXr0ID.jpg')
                .setFooter('Requested by ' + message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp();
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setStyle('LINK')
                        .setURL(data.list[0].permalink)
                        .setLabel('View Definition on Urban Dictionary')
                )
            wait.delete();
            message.reply({ embeds: [embed], components: [row], allowedMentions: { repliedUser: false } });
        } catch(error) {
            wait.delete();
            console.log(error)
            message.reply('An error occured! Please try again later!').then(x => {
                setTimeout(() => {
                    message.delete();
                    x.delete();
                }, 4000);
            });
        }
    },
};