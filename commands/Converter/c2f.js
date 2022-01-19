module.exports = {
    name: 'c2f',
    description: 'Convert Celsius to Fahrenheit',
    cooldown: 1,
    usage: 'c2f <celsius>',
    aliases: ['celsius2fahrenheit', 'cel2fahr', 'cel2f'],
    args: 1,
    async execute(client, message, args) {
        const celsius = parseFloat(args[0]);
        const fahrenheit = (celsius * 9/5) + 32;
        message.reply({content: 'That is ' + fahrenheit + ' degrees Fahrenheit!', allowedMentions: { repliedUser: false }});
    }
}