module.exports = {
    name: 'f2c',
    description: 'Convert Fahrenheit to Celsius',
    cooldown: 1,
    usage: 'f2c <celsius>',
    aliases: ['fahrenheit2celsius', 'fahr2cel', 'f2cel'],
    args: 1,
    async execute(client, message, args) {
        const fahrenheit = parseFloat(args[0]);
        const celsius = (fahrenheit - 32) * 5/9;
        message.reply('That is ' + celsius + ' degrees Celsius!');
    }
}