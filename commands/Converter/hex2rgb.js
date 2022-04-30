const {MessageAttachment} = require('discord.js');
const Canvas = require('canvas');
module.exports = {
    name: 'hex2rgb',
    description: 'Convert Hex to RGB',
    args: 1,
    usage: 'hex2rgb <hex>',
    aliases: ['hextorgb'],
    async execute(client, message, args) {
        try {
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
            if (isNaN(r) || isNaN(g) || isNaN(b)) {
                return message.reply('Invalid Hex value!');
            }
            const canvas = Canvas.createCanvas(128, 128);
            const context = canvas.getContext('2d');
            context.fillStyle = `#${hex}`;
            context.fillRect(0, 0, 128, 128);
            const attachment = new MessageAttachment(canvas.toBuffer('image/png'), 'color.png');
            message.reply({content: 'It\'s ' + r + ', ' + g + ', ' + b + '.', files: [attachment], allowedMentions: { repliedUser: false }});
        } catch (err) {
            console.log(err);
            message.reply('An unknown error occurred!').then(x => {
                setTimeout(() => {
                    message.delete();
                    x.delete();
                }, 4000)
            })
        }
    },
};