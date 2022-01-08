const axios = require('axios');
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'canister',
    description: 'Get the info of a jailbreak package via Canister',
    usage: 'canister [query]',
    cooldown: 2,
    aliases: ['canister', 'tweak', 'tweakinfo', 'packageinfo', 'package'],
    async execute(client, message, args) {
        const wait = await message.channel.send('Fetching info...');
        if (!args[0]) {message.reply('Please provide a query!');}
        else {
            const input = '' + args;
            const query = input.split(' ').join('%20');
            const info = await axios.get('https://api.canister.me/v1/community/packages/search?query=' + query);
            if (!info.data.data[0]) {
                wait.delete();
                message.reply('No results found!').then(x => {
                    setTimeout(() => {
                        message.delete();
                        x.delete();
                    }, 4000);
                });
            } else {
                try {
                    const embed = new MessageEmbed()
                        .setTitle(info.data.data[0].name)
                        .setDescription(info.data.data[0].description)
                        .setTimestamp()
                        .addFields(
                            { name: 'Author', value: '' + info.data.data[0].author, inline: true },
                            { name: 'Maintainer', value: '' + info.data.data[0].maintainer, inline: true },
                            { name: 'Bundle ID', value: '' + info.data.data[0].identifier, inline: true },
                            { name: 'Repository', value: '' + info.data.data[0].repository.uri },
                        )
                        .setFooter('Requested by ' + message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                        .setColor('#17A8FF');
                    wait.delete();
                    message.reply({ embeds: [embed] });
                } catch {
                    wait.delete();
                    message.reply('An error occurred!').then(x => {
                        setTimeout(() => {
                            message.delete();
                            x.delete();
                        },4000);
                    }); 
                }
            }
        }
    },
};