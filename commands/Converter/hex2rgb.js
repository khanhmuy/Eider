module.exports = {
    name: 'hex2rgb',
    description: 'Convert Hex to RGB',
    args: 1,
    usage: 'hex2rgb <hex>',
    aliases: ['hextorgb'],
    async execute(client, message, args) {
        const hex = args[0];
        console.log(hex.slice(0, 2), hex.slice(2, 4), hex.slice(4, 6));
        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);
        message.reply('It is ' + r + ', ' + g + ', ' + b + '.');
    },
};