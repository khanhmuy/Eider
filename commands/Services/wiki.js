const Vibrant = require('node-vibrant');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const tldr = require('wikipedia-tldr');
module.exports = {
    name: 'wikipedia',
    description: 'Search for things on Wikipedia!',
    usage: 'wikipedia <search term>',
    cooldown: 2,
    aliases: [ 'wiki' ],
    async execute(client, message, args) {
        try {
            const query = args.join(' ');
            if (!query) {
                message.reply({content: 'Please enter a search term!', allowedMentions: { repliedUser: false }});
            } else {
                const wait = await message.channel.send('Give me a second...');
                const res = await tldr(query)
                let color = null
                let thumbnail = ''
                try {
                    thumbnail = res.thumbnail.source;
                    color = await Vibrant.from(res.thumbnail.source).getPalette();
                    color = color.Vibrant.hex; 
                } catch {
                    thumbnail = 'https://en.wikipedia.org/static/images/project-logos/enwiki.png'
                    color = 'BLUE'
                }
                let extract = '';
                if (res.extract.length > 1024) {
                    extract = res.extract.substring(0, 1018) + '(...)';
                } else {
                    extract = res.extract;
                }
                const embed = new MessageEmbed()
                    .setTitle(res.title)
                    .setThumbnail(thumbnail)
                    .setDescription(res.description)
                    .addField('\u200b', extract)
                    .setColor(color)
                    .setTimestamp()
                message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
                wait.delete();
            }
        } catch (error) {
            wait.delete();
            console.log(error);
            message.reply('Something went wrong, try again later.').then(x => {
                setTimeout(() => {
                    x.delete();
                }, 4000)
            })
        }
    }
};