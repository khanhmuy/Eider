const {MessageEmbed} = require('discord.js');
module.exports = {
    name: 'messageUpdate',
    async execute (client, message) {
        try {
            let deleteEmbed = new MessageEmbed()
                .setAuthor(message.author.username + '#' + message.author.discriminator, `${message.author.displayAvatarURL({ dynamic: true })}?size=1024`)
                .setDescription(`:pencil2: Message edited in <#${message.channelId}>. [Jump to message](https://discordapp.com/channels/${message.guild.id}/${message.channelId}/${message.id})`)
                .setColor("BLUE")
                .addField("Before", `${message.content}`)
                .addField(`After`, `${message.reactions.message.content}`)
                .addField(`Message ID`, `${message.id}`, true)
                .addField(`Author`, `<@!${message.author.id}>`, true)
                .addField(`Author ID`, `${message.author.id}`, true)
                .setFooter(`${message.guild.name}`)
                .setTimestamp();
            let logChannel = client.channels.cache.get(client.data.get(`guild.${message.guild.id}.logChannel`));
            logChannel.send({embeds: [deleteEmbed]});
        } catch (err) {
            console.log(err);
        }
    },
};