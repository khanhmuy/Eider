module.exports = {
	name: 'coinflip',
	description: 'Flip a coin!',
	cooldown: 2,
	usage: 'coinflip',
	aliases: [ 'flip', 'coin' ],
	async execute(client, message) {
		const flip = ['heads', 'tails'];
		const result = flip[Math.floor(Math.random() * flip.length)];
		message.reply({content: `It's ${result}!`, allowedMentions: { repliedUser: false }});
	},
};