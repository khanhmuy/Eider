const {MessageEmbed} = require('discord.js');
module.exports = {
    name: 'messageUpdate',
    async execute (client, message) {
        try {
            try {
                if (embedType === 'image' || 'video') {};
                const embedType = message.reactions.message.embeds[1].type;
            } catch {}
            const fetchedLogs = await message.guild.fetchAuditLogs({
                limit: 1,
                type: 'MESSAGE_UPDATE',
            });
            const deletionLog = fetchedLogs.entries.first();
            const { executor, target } = deletionLog;
            const executorID = executor.id;
            if (executorID === client.user.id) {};
            if (message.webhookId) {};
            const logChannel = client.channels.cache.get(client.data.get(`guild.${message.guild.id}.logChannel`));
            if (logChannel === undefined) return;
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
            logChannel.send({content: '----------Start of log----------',embeds: [deleteEmbed]});
        } catch (err) {
            console.log(err);
        }
    },
};