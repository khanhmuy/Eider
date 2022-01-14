const discord = require('discord.js');
const Vibrant = require('node-vibrant');
const moment = require('moment');
module.exports = {
    name:'userinfo',
    description: 'Get details of a user account',
    usage: 'userinfo [user]',
    aliases: ['user', 'info', 'usr', 'usrinfo'],
    cooldown:1,
    async execute(client, message, args) {
        const wait = await message.channel.send('Give me a second please...');
        let member = message.mentions.members.first() || message.member,
            user = member.user;
        const color = await Vibrant.from(user.displayAvatarURL({ format: 'png', size: 1024 })).getPalette();
        const roles = member.roles.cache.filter(r => r.name !== "@everyone").map(r => r).join(" | ") || 'No Roles';
        const embed = new discord.MessageEmbed()
            .setTitle('User information of ' + user.tag)
            .setColor(color.Vibrant.hex)
            .setURL('https://discord.com/users/' + user.id)
            .setThumbnail(user.displayAvatarURL({ dynamic:true })+'?size=1024')
            .setDescription('[Avatar](' + user.displayAvatarURL({ dynamic:true })+'size=1024' + ')')
            .addFields(
                { name: 'Account created at', value: moment(user.createdAt).format('LLLL'), inline: true },
                { name: 'Joined this server at', value: moment(user.joinedAt).format('LLLL'), inline: true },
                // fuck why wouldn't this work { name: 'Online status', value: '' + user.presence.status, inline: true },
                { name: 'Roles', value: '' + roles, inline: true },
                { name: 'Account identification', value: 'Tag: ' + user.tag + '\nID: ' + user.id, inline: true },
            )
            .setTimestamp()
            .setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}));
        wait.delete();
        message.reply({embeds: [embed]});
    }
};