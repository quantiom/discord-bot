const { Utils, Handler, config } = require('../index.js');

module.exports = async (client, message) => {
    if (message.author.id == client.user.id) return;

    if (message.channel.type == 'text')
    {
        let customCommand = (await Utils.db.all(`SELECT response FROM commands WHERE command=? AND guildid=? LIMIT 1`, [message.content.toLowerCase(), message.guild.id]))[0];
        if (customCommand) message.channel.send(customCommand.response);
    }

    if (message.content.indexOf(config.prefix) != 0) return;

    const args = message.content.split(/ +/g);
    const command = args.shift().slice(config.prefix.length).toLowerCase();
    const cmd = Handler.commands.get(command) || Handler.aliases.get(command);

    if (!cmd) return;
    
    if (message.channel.type !== cmd.type) return;

    if (cmd.type == 'text' && cmd.permissions && cmd.permissions.length > 0)
    {
        if (!message.member.hasPermission(cmd.permissions))
        {
            if (message.channel.permissionsFor(message.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS']))
                return message.channel.send(Utils.errorEmbed(`You cannot use this command because you are missing the \`${cmd.permissions.map(c => c).join(', ')}\` permission(s).`));
            return;
        }
            
    }

    cmd.execute(client, message, message.content.split(' '));
}