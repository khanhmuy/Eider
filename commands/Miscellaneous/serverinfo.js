const {MessageEmbed} = require('discord.js');
const Vibrant = require('node-vibrant');
module.exports = {
    name: 'serverinfo',
    description: 'Get information about the current server',
    usage: 'serverinfo',
    aliases: ['server', 'serverinformation'],
    cooldown: 3,
    async execute(client, message) {
        const server = await message.guild.fetch()
        const online = server.approximatePresenceCount;
        const channels = await message.guild.channels.fetch();
        const roles = await message.guild.roles.fetch();
        const emojis = await message.guild.emojis.fetch();
        let color = null
        color = await Vibrant.from(server.iconURL({format: 'png'})).getPalette()
        const embed = new MessageEmbed()
            .setColor(color.Vibrant.hex)
            .setTitle(`${server.name}`)
            .setThumbnail(server.iconURL())
            .setDescription(`👥 **${server.memberCount}** members | <:online:957453541977514034> **${online}** online\n👤 **Owner**: <@!${server.ownerId}>\n📅 **Created at**: ${server.createdAt}\n🔒 **Security level**: ${server.verificationLevel}`)
            .addField('\u200b', `⌨ **${channels.size}** channels | **${roles.size}** roles | **${emojis.size}** emojis`)
            .setFooter(`Server ID: ${server.id}`)
        message.reply({embeds: [embed], allowedMentions: { repliedUser: false }});
    },
};