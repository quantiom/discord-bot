const { Utils } = require('../index.js');

module.exports = async (client, member) => {
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