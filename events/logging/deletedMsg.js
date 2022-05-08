const {MessageEmbed} = require('discord.js');
module.exports = {
    name: 'messageDelete',
    async execute (client, message) {
        try {
            const logChannel = client.channels.cache.get(client.data.get(`guild.${message.guild.id}.logChannel`));
            if (logChannel === undefined) return;
            let deleteEmbed = new MessageEmbed()
                .setAuthor(message.author.username + '#' + message.author.discriminator, `${message.author.displayAvatarURL({ dynamic: true })}?size=1024`)
                .setDescription(`:wastebasket: Message deleted in <#${message.channelId}>`)
                .setColor("RED")
                .addField("Message", `${message.content}`)
                .addField(`Message ID`, `${message.id}`, true)
                .addField(`Author`, `<@!${message.author.id}>`, true)
                .addField(`Author ID`, `${message.author.id}`, true)
                .setFooter(`${message.guild.name}`)
                .setTimestamp();
            logChannel.send({embeds: [deleteEmbed]});
        } catch (err) {
            console.log(err);
        }
    },
};
