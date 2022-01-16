const { MessageEmbed } = require('discord.js'), fetch = require('node-fetch'), ytdl = require('ytdl-core');
const ytsr = require('ytsr');
module.exports = {
    name: 'ytsearch',
    description: 'Search for videos on YouTube',
    usage: 'ytsearch <search term>',
    cooldown: 2,
    aliases: [ 'yt', 'youtube', 'ytsearch', 'search' ],
    async execute(client, message, args) {
        if(!args[0]) return message.reply('Please provide a search term.').then(x => {
            setTimeout(() => {
                x.delete();
            }, 4000)
        });
        const query = args.join(' ');
        const link = 'https://www.youtube.com/results?search_query=' + args.join('%20')
        const wait = await message.channel.send('Searching...');
        const result = await ytsr(query, { limit: [8] });
        const embed = new MessageEmbed()
            .setTitle('Results for ' + query)
            .setDescription('[Total results](' + link + '): ' + result.results)
            .setURL(link)
            .setColor('#FF0000')
            .setTimestamp()
            .setFooter('Requested by ' + message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        result.items.forEach(result => {
            if (result.type !== 'video') return
            embed.addField(result.title, `Channel: [${result.author.name}](${result.author.url})\n 👀: ${result.views} \nDuration: ${result.duration}\nUploaded ${result.uploadedAt}\n\n[View in YouTube](${result.url})`)
          })
        wait.delete();
        message.reply({ embeds: [embed] });
    }
}