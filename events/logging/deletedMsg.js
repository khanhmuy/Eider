const {MessageEmbed} = require('discord.js');
module.exports = {
    name: 'messageDelete',
    async execute (client, message) {
        const logChannel = client.channels.cache.get(client.data.get(`guild.${message.guild.id}.logChannel`));
        try {
<<<<<<< HEAD
=======
            const logChannel = client.channels.cache.get(client.data.get(`guild.${message.guild.id}.logChannel`));
>>>>>>> 54c2640f3cc7680942eda927cd785f9744c1a5bc
            if (logChannel === undefined) return;
            const fetchedLogs = await message.guild.fetchAuditLogs({
                limit: 1,
                type: 'MESSAGE_DELETE',
            });
            const deletionLog = fetchedLogs.entries.first();
            const { executor, target } = deletionLog;
            let deleteEmbed = new MessageEmbed()
                .setAuthor(message.author.username + '#' + message.author.discriminator, `${message.author.displayAvatarURL({ dynamic: true })}?size=1024`)
                .setDescription(`:wastebasket: Message deleted in <#${message.channelId}>`)
                .setColor("BLUE")
                .addField("Message", `${message.content}`)
                .addField(`Message ID`, `${message.id}`, true)
                .addField(`Author`, `<@!${message.author.id}>`, true)
                .addField(`Author ID`, `${message.author.id}`, true)
                .addField(`Deleted by`, `<@!${executor.id}>`, true)
                .setFooter(`${message.guild.name}`)
                .setTimestamp();
            logChannel.send({embeds: [deleteEmbed]});
        } catch (err) {
<<<<<<< HEAD
            try {
                if (message.reactions.message.embeds.type = 'rich') {
                    logChannel.send({content:`:wastebasket: Embed deleted in <#${message.channelId}>\nMessage ID: ${message.id}\nAuthor: <@!${message.author.id}>\nAuthor ID: ${message.author.id}\nEmbeds:\n`, embeds: message.reactions.message.embeds});
                };
            } catch (err) {
                console.log(err);
            }
=======
            console.log(err);
>>>>>>> 54c2640f3cc7680942eda927cd785f9744c1a5bc
        }
    },
};