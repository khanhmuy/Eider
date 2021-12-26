const { MessageEmbed } = require('discord.js')
module.exports = {
    name: '8ball',
    description: 'Replys with a yes/no answer to your question',
    usage: '8ball [question]',
    cooldown: 5,
    aliases: ['8ball', '8b'],
    async execute(client, message, args) {
        const answers = [
            'It is Certain.',
            'It is decidedly so.',
            'Without a doubt.',
            'Yes definitely.',
            'You may rely on it.',
            'As I see it, yes.',
            'Most likely.',
            'Outlook good.',
            'Yes.',
            'Signs point to yes.',
            'Reply hazy, try again.',
            'Ask again later.',
            'Better not tell you now.',
            'Cannot predict now.',
            'Concentrate and ask again.',
            'Don\'t count on it.',
            'My reply is no.',
            'My sources say no.',
            'Outlook not so good.',
            'Very doubtful.'
        ]
        const answer = Math.floor(Math.random() * answers.length)
        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('**Magic 8-Ball**')
            .setDescription(`**Our Magic 8-Ball Says**: ${answers[answer]}`)
        message.reply({ embeds: [embed] });
    },
};