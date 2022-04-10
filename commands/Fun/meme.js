const axios = require('axios');
const { MessageEmbed } = require('discord.js');
const Vibrant = require('node-vibrant');
module.exports = {
	name: 'meme',
	description: 'Send a random meme!',
	cooldown: 2,
	usage: 'meme',
	aliases: [ 'givememe', 'gibmeme', 'plsmeme', 'memes' ],
	async execute(client, message) {
		try {
			const wait = await message.channel.send('Fetching...');
			const res = await axios.get('https://meme-api.herokuapp.com/gimme/1')
			let color = null;
			color = await Vibrant.from(res.data.memes[0].url).getPalette();
			color = color.Vibrant.hex;
				const embed = new MessageEmbed()
					.setColor(color)
					.setTitle(res.data.memes[0].title)
					.setImage(res.data.memes[0].url)
					.setURL(res.data.memes[0].postLink)
					.setFooter(`Author: ${res.data.memes[0].author}`);
				message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
				wait.delete();
		} catch (error) {
			wait.delete();
			console.log(error);
			message.reply('Something went wrong, try again later.').then(x => {
                setTimeout(() => {
                    x.delete();
                }, 4000)
            });
		}
	},
};