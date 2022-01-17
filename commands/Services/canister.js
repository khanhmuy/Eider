const axios = require('axios');
const Vibrant = require('node-vibrant');
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
            const info = await axios.get('https://api.canister.me/v1/community/packages/search?query=' + query + '&searchFields=identifier,name,author,maintainer&responseFields=identifier,name,description,packageIcon,repository.uri,repository.name,author,latestVersion,depiction,section,price,maintainer');
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
                    let color = null
                    try {
                        const icon = info.data.data[0].packageIcon;
                        if (info.data.data[0].packageIcon.startsWith('http:') || info.data.data[0].packageIcon.startsWith('https:')) {
                            color = await Vibrant.from(info.data.data[0].packageIcon || 'https://repo.packix.com/api/Packages/60bfb71987ca62001c6585e6/icon/download?size=medium&hash=2').getPalette()
                            color = color.Vibrant.hex
                        } else {
                            color = '#fccc04'
                            info.data.data[0].packageIcon = undefined
                        }
                    } catch {
                        color = '#fccc04'
                        info.data.data[0].packageIcon = undefined
                    }
                    const embed = new MessageEmbed()
                        .setTitle(info.data.data[0].name || 'what')
                        .setDescription(info.data.data[0].description || 'No description provided.')
                        .setThumbnail(info.data.data[0].packageIcon || 'https://repo.packix.com/api/Packages/60bfb71987ca62001c6585e6/icon/download?size=medium&hash=2')
                        .setColor(color || '#fccc04')
                        .addFields(
                            { name: 'Author', value: '' + info.data.data[0].author || 'Unknown', inline: true },
                            { name: 'Version', value: '' + info.data.data[0].latestVersion || 'Unknown', inline: true },
                            { name: 'Price', value: '' + info.data.data[0].price || 'Unknown', inline: true },
                            { name: 'Bundle ID', value: '' + info.data.data[0].identifier, inline: true },
                            { name: 'Repository', value: '[' + info.data.data[0].repository.name + ']' + '(' + info.data.data[0].repository.uri + ')', inline: true },
                            { name: 'Add repository', value: '[Add to Cydia](' + 'https://sharerepo.stkc.win/v2/?pkgman=cydia&repo=' + info.data.data[0].repository.uri + ') | [Add to Sileo](' + 'https://sharerepo.stkc.win/v2/?pkgman=sileo&repo=' + info.data.data[0].repository.uri + ') | [Add to Zebra](' + 'https://sharerepo.stkc.win/v2/?pkgman=zebra&repo=' + info.data.data[0].repository.uri + ') | [Add to Installer](' + 'https://sharerepo.stkc.win/v2/?pkgman=installer&repo=' + info.data.data[0].repository.uri + ')' },
                        )
                        .setFooter('Powered by Canister')
                        .setTimestamp()
                    wait.delete();
                    message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
                } catch(error) {
                    console.log(error)
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