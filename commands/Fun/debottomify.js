const {encode, decode} = require('bottomify');
module.exports = {
    name: 'debottomify',
    description: 'De-bottomify',
    cooldown: 2,
    usage: 'bottomify <text>',
    aliases: [ 'debottomify', 'debottomifytext', 'debottomifytext', 'debottom', 'unbottomify', 'unbottom' ],
    execute(client, message, args) {
        try {
            if (!args[0]) {
                return message.channel.send('You need to provide some text to bottomify!').then(x => {
                    setTimeout(() => {
                        message.delete();
                        x.delete();
                    }, 3000)
                });
            } else {
                const text = decode(args.join(' '));
                message.reply({content: text, allowedMentions: { repliedUser: false }});
            }
        } catch (error) {
            console.log(error);
            message.reply('There was an error trying to execute that command!');
        }
    },
};