module.exports = {
	name: 'roll',
	description: 'Pick a number between x and y',
	cooldown: 2,
	args: 2,
	usage: 'roll <min> <max>',
	async execute(client, message, args) {
		try {
			let weirdThonk = args.content.split(' ').slice(1);
			weirdThonk.forEach((item) => {
				weirdThonk[weirdThonk.indexOf(item)] = parseInt(item);
			});
			if (!weirdThonk[1]) return message.reply('I need a second number!');
			if (!Number.isInteger(weirdThonk[0]) || !Number.isInteger(weirdThonk[1])) return message.reply('At least one of your inputs were not a number!');
			const number = Math.floor(Math.random() * (Math.floor(weirdThonk[0]) - Math.ceil(weirdThonk[1]))) + Math.ceil(weirdThonk[1]);
			if(number == '69') {
				args.channel.send('Its 69, nice');
			} else {
				args.channel.send(`It's ${number}!`);
			}
		} catch {
			message.reply('Something went wrong, double check your arguments.');
		}
	},
};