const axios = require('axios');
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'pronoun',
    description: 'Gets a user\'s pronouns through PronounDB',
    usage: 'pronoun [user]',
    cooldown: 5,
    aliases: [ 'pronoundb', 'pronounDB', 'Pronoundb', 'PronounDB', 'pronouns' ],
    async execute(client, message, args) {
        let id = '';
        let pronoun = '';
        if (!args[0]) {
            return message.reply('Please provide a user!').then(x => {
                setTimeout(() => {
                    message.delete();
                    x.delete();
                }, 5000);
            });
        }
        if (!args[0].match(/<@!*&*[0-9]+>/)) {
            id = args[0];
        } if (args[0].match(/<@!*&*[0-9]+>/)) {
            id = message.mentions.users.first();
            if (id === undefined) {return message.channel.send('Please provide a valid user!').then(x => {
                setTimeout(() => {
                    message.delete();
                    x.delete();
                }, 5000);
            })}
        }
        const wait = await message.channel.send('Fetching pronoun...');
        axios.get('https://pronoundb.org/api/v1/lookup?platform=discord&id=' + id)
        .then(async response => {
            if (response.data.pronouns.match('unspecified')) {
                pronoun = 'unspecified';
            } if (response.data.pronouns.match('hh')) {
                pronoun = 'he/him';
            } if (response.data.pronouns.match('hi')) {
                pronoun = 'he/it';
            } if (response.data.pronouns.match('hs')) {
                pronoun = 'he/she';
            } if (response.data.pronouns.match('ht')) {
                pronoun = 'he/they';
            } if (response.data.pronouns.match('ih')) {
                pronoun = 'it/him';
            } if (response.data.pronouns.match('ii')) {
                pronoun = 'it/its';
            } if (response.data.pronouns.match('it')) {
                pronoun = 'it/they';
            } if (response.data.pronouns.match('shh')) {
                pronoun = 'she/he';
            } if (response.data.pronouns.match('sh')) {
                pronoun = 'she/her';
            } if (response.data.pronouns.match('st')) {
                pronoun = 'she/they';
            } if (response.data.pronouns.match('si')) {
                pronoun = 'she/it';
            } if (response.data.pronouns.match('th')) {
                pronoun = 'they/he';
            } if (response.data.pronouns.match('ti')) {
                pronoun = 'they/it';
            } if (response.data.pronouns.match('ts')) {
                pronoun = 'they/she';
            } if (response.data.pronouns.match('tt')) {
                pronoun = 'they/them';
            } if (response.data.pronouns.match('any')) {
                pronoun = 'Any pronouns.';
            } if (response.data.pronouns.match('other')) {
                pronoun = 'Other pronouns.';
            } if (response.data.pronouns.match('ask')) {
                pronoun = 'Ask me my pronouns.';
            } if (response.data.pronouns.match('avoid')) {
                pronoun = 'Avoid pronouns, use my name.'
            }
            let replyMention = '<@!' + id + '>';
            wait.delete();
            const embed = new MessageEmbed()
                .setColor('#262626')
                .setTitle(`PronounDB`)
                .setDescription('Pronouns of ' + replyMention + ' is: ' + pronoun)
                .setTimestamp()
            message.reply({ embeds: [embed] }).then(x => {
                setTimeout(() => {
                    message.delete();
                    x.delete();
                }, 20000);
            });
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