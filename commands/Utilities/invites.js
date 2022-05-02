const {Permissions, MessageEmbed} = require('discord.js');
const moment = require('moment');
module.exports = {
    name: 'serverinvites',
    description: 'Get the server\'s invite links',
    usage: 'serverinvites',
    aliases: ['invites', 'invitations', 'serverinvite', 'serverinvitations'],
    cooldown: 5,
    guildOnly: true,
    permissions: [ Permissions.FLAGS.ADMINISTRATOR ],
    async execute(client, message, args) {
        try {
            const guild = await message.guild.fetch();
            const invites = await message.guild.invites.fetch();
            const embed = new MessageEmbed()
                .setTitle(`Invites for ${message.guild.name}`)
                .setThumbnail(guild.iconURL())
                .setColor('BLUE')
                .setTimestamp()
                .setFooter('Last Updated')
            invites.forEach(invite => {
                embed.addField(`${invite.code}`, `Uses: ${invite.uses}\nMax uses: ${invite.maxUses}\nCreated at: ${moment(invite.createdTimestamp).format('LLLL')}\nCreated by: <@!${invite.inviter.id}>\nChannel: <#${invite.channel.id}>`)
            });
            message.reply({embeds: [embed], allowedMentions: { repliedUser: false }});
        } catch(err) {
            console.log(err);
            message.reply('An unknown error happened').then(x => {
                setTimeout(() => {
                    message.delete();
                    x.delete();
                }, 4000)
            })
        }
    }
};