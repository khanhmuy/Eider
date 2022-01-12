module.exports = {
    name: 'roll',
    description: 'Pick a number between x and y',
    cooldown: 2,
    args: 2,
    usage: 'roll <min> <max>',
    async execute(message, args) {
        try {
            let weirdThonk = args.content.split(' ').slice(1)
            
            weirdThonk.forEach((item) => {
                weirdThonk[weirdThonk.indexOf(item)] = parseInt(item);
            });
            if (!weirdThonk[1]) return message.reply('I Need A Second Number!').then(x => {
                setTimeout(() => {
                    message.delete();
                    x.delete();
                }, 4000);
            });
            if (!Number.isInteger(weirdThonk[0]) || !Number.isInteger(weirdThonk[1])) return message.reply('At least one of your inputs were not a number!').then(x => {
                setTimeout(() => {
                    message.delete();
                    x.delete();
                }, 4000);
            });
            const number = Math.floor(Math.random() * (Math.floor(weirdThonk[0]) - Math.ceil(weirdThonk[1]))) + Math.ceil(weirdThonk[1]);
            args.reply(`It's ${number}!`);
        } catch {
            args.reply('An error occurred! Please double check your arguments.').then(x => {
                setTimeout(() => {
                    args.delete();
                    x.delete();
                }, 4000);
            })
        }
    },
};