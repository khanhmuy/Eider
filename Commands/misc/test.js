const axios = require('axios');
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'test',
    description: 'Gets a user\'s pronoun through PronounDB',
    usage: 'pronoun [mention / id]',
    cooldown: 5,
    async execute(client, message, args) {
        let embed = '';
        let pronoun = '';
        let tag = '';
        if (!args[0].match(/<@!*&*[0-9]+>/)) {
            tag = args[0];
        } if (args[0].match(/<@!*&*[0-9]+>/)) {
            tag = args[0].split("!")[1].split(">")[0];
        }
        axios.get('https://pronoundb.org/api/v1/lookup?platform=discord&id=' + tag)
        .then(function(response) {
            if (response.data.pronouns.match('hh')){
                pronoun = 'he/him';
                message.reply("" + pronoun)
            }
        })
    },
};