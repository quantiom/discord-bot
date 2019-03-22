const { Utils } = require('../index.js');
const { RichEmbed } = require('discord.js');

module.exports = async (client, member) => {

    member.guild.fetchMember(member, true);

    Utils.db.all('SELECT * FROM autorole WHERE guildid=? LIMIT 1', [member.guild.id]).then(q => {
        if (!q || q.length == 0) return;
        
        let role = member.guild.roles.get(q[0].roleid);
        if (!role || role.managed || member.guild.me.highestRole.comparePositionTo(role) < 1 || !member.guild.me.hasPermission(['MANAGE_ROLES'])) return;
        
            member.addRole(role, "Auto Role");
    })

    Utils.logCheck(member.guild, 'memberJoins').then(logChannel => {
        if (!logChannel) return;

        logChannel.send(new RichEmbed()
            .setAuthor("User Joined", client.user.displayAvatarURL)
            .addField("Username", member.user.tag)
            .addField("ID", member.user.id)
            .addField("Account Creation", member.user.createdAt)
            .setTimestamp()
            .setColor(Utils.red))
    });

    let data = (await Utils.db.all('SELECT * FROM announcements WHERE guildid=? LIMIT 1', [member.guild.id]))[0];
    if (!data.announceChannel || data.announceChannel.toLowerCase() == 'ignore') return;
    if (!data.joinEnabled || !data.joinMessage || data.joinMessage.length > 1500) return;

    let channel = member.guild.channels.get(data.announceChannel);
    if (!channel || !channel.permissionsFor(member.guild.me).has('SEND_MESSAGES')) return;

    let newJoinMessage = data.joinMessage;

    newJoinMessage = newJoinMessage.replace('{username}', member.user.username);
    newJoinMessage = newJoinMessage.replace('{@user}', member);
    newJoinMessage = newJoinMessage.replace('{server}', member.guild.name);

    let split = newJoinMessage.split(' ');
    
    for (let i = 0; i < split.length; i++)
    {
        if (split[i].match(/{#(\w+)}/))
        {
            let replace = split[i].match(/{#(\w+)}/)[1];
            let channel = member.guild.channels.find(c => c.name == replace);
            if (channel) split[i] = channel;
        }
    }

    channel.send(split.join(' '));
}