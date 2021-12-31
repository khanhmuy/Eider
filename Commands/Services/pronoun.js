const axios = require('axios');
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'pronoun',
    description: 'Gets a user\'s pronoun through PronounDB',
    usage: 'pronoun [user]',
    cooldown: 5,
    aliases: [ 'pronoundb', 'pronounDB', 'Pronoundb', 'PronounDB' ],
    async execute(client, message, args) {
        let pronoun = '';
        let tag = '';
        if (!args[0]) {
            message.reply('Please provide a user!');
        }
        if (!args[0].match(/<@!*&*[0-9]+>/)) {
            id = args[0];
        } if (args[0].match(/<@!*&*[0-9]+>/)) {
            id = args[0].split("!")[1].split(">")[0];
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
                .setColor('#FFC0DD')
                .setTitle(`PronounDB`)
                .setDescription('Pronouns of ' + replyMention + ' is: ' + pronoun)
                .setTimestamp()
            const reply = await message.channel.send({ embeds: [embed] });
            setTimeout(() => {
                message.delete();
                reply.delete();
            }, 25000);
        })
        .catch(function(error) {
            message.reply('Something went wrong, try again later.');
        })
    },
};