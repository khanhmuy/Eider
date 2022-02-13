module.exports = {
    name: 'hex2rgb',
    description: 'Convert Hex to RGB',
    args: 1,
    usage: 'hex2rgb <hex>',
    aliases: ['hextorgb'],
    async execute(client, message, args) {
        var hex = args[0];
        if (hex.startsWith ('#')) {
            hex = args[0].slice(1);
        }
        if (hex.length != 6) {
            return message.reply("Hex must be 6 characters long!");
        }
        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);
        message.reply({content: 'It\'s ' + r + ', ' + g + ', ' + b + '.', allowedMentions: { repliedUser: false }});
    },
};