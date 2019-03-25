const Command = require('../../Utils/command.js');
const { Utils } = require('../../index.js');

module.exports = class extends Command 
{
    constructor()
    {
        super({
            name: "unban", 
            description: "Unbans a user.",
            usage: "unban <username | userid>",
            permissions: ['BAN_MEMBERS'],
            bot_permissions: ['BAN_MEMBERS']
        });
    }

    async execute(client, message, args)
    {
        if (!args[1])
            return message.channel.send(Utils.usageError(this));

        message.guild.fetchBans().then(bans => {
            let user = bans.get(args[1]) || bans.find(user => user.username.toLowerCase() == args.slice(1).join(' ').toLowerCase());
            if (!user) return message.channel.send(Utils.errorEmbed("Invalid user to unban."));

            try {
                message.guild.unban(user);
                message.channel.send(Utils.embed("Success", "Unbanned " + user.tag));
            } catch (e) {
                message.channel.send(Utils.errorEmbed("An error occured."));
            };
        });
    }
}