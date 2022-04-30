const {MessageAttachment} = require('discord.js');
const Canvas = require('canvas');
module.exports = {
    name: 'rgb2hex',
    description: 'Convert RGB to Hex',
    args: 3,
    usage: 'rgb2hex <r> <g> <b>',
    aliases: ['rgbtohex'],
    async execute(client, message, args) {
        try {
            const r = parseInt(args[0]);
            const g = parseInt(args[1]);
            const b = parseInt(args[2]);
            if (isNaN(r) || isNaN(g) || isNaN(b)) {
                return message.reply('Invalid RGB values!');
            };
            const hex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
            const canvas = Canvas.createCanvas(128, 128);
            const context = canvas.getContext('2d');
            context.fillStyle = hex;
            context.fillRect(0, 0, 128, 128);
            const attachment = new MessageAttachment(canvas.toBuffer('image/png'), 'color.png');
            message.reply({content: `It's ${hex.toUpperCase()}`, files: [attachment], allowedMentions: { repliedUser: false }});
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