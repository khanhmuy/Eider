module.exports = {
    name: 'rgb2hex',
    description: 'Convert RGB to Hex',
    args: 3,
    usage: 'rgb2hex <r> <g> <b>',
    aliases: ['rgbtohex'],
    async execute(client, message, args) {
        const r = parseInt(args[0]);
        const g = parseInt(args[1]);
        const b = parseInt(args[2]);
        const hex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        message.reply('It is ' + hex + '.');
    },
};