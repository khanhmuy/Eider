const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'meme',
	description: 'Send a random meme!',
	cooldown: 2,
	usage: 'meme',
	aliases: [ 'givememe', 'gibmeme', 'plsmeme', 'memes' ],
	async execute(client, message) {
		const wait = await message.channel.send('Fetching...');
		axios.get('https://meme-api.herokuapp.com/gimme/1')
			.then(function(response) {
				const embed = new MessageEmbed()
					.setColor('RANDOM')
					.setTitle(response.data.memes[0].title)
					.setImage(response.data.memes[0].url)
					.setURL(response.data.memes[0].postLink)
					.setFooter(`Author: ${response.data.memes[0].author}`);
				wait.delete();
				message.channel.send({ embeds: [embed], allowedMentions: { repliedUser: false } });
			});
	},
};