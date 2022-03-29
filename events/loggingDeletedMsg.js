const {MessageEmbed} = require('discord.js');
module.exports = {
    name: 'messageDelete',
    async execute (client, message) {
        try {
            let deleteEmbed = new MessageEmbed()
                .setAuthor(message.author.username + message.author.discriminator, `${message.author.displayAvatarURL({ dynamic: true })}?size=1024`)
                .setDescription(`:wastebasket: Message deleted in <#${message.channelId}>`)
                .setColor("#fc3c3c")
                .addField("Message", `${message.content}`)
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