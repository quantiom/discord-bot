const Command = require('../../Utils/command.js');
const { Utils } = require('../../index.js');

module.exports = class extends Command 
{
    constructor()
    {
        super({
            name: "softban", 
            description: "Bans a user, and immediately unbans them to delete their messages.",
            usage: "softban <@user | userid> |reason|",
            permissions: ['BAN_MEMBERS'],
            bot_permissions: ['BAN_MEMBERS']
        });
    }

    async execute(client, message, args)
    {
        if (!args[1])
            return message.channel.send(Utils.usageError(this));

        let member = message.guild.members.get(args[1]) || Utils.memberFromMention(args[1], message.guild);
        if (!member) return message.channel.send(Utils.errorEmbed("Invalid member to softban."));

        if (!member.bannable)
            return message.channel.send(Utils.errorEmbed("I cannot softban this member, his/her role may be above mine, or they may be the owner of the server."));
        
        let reason = "Softbanned by " + message.author.tag + ".";
        if (args[2])
            reason = "Softbanned by " + message.author.tag + ". Reason: " + args.slice(2).join(' ');

        try {
            member.ban({days: 7, reason: reason}).then(() => {
                message.guild.unban(member.user.id, 'Unbanned from softban.');
            });
            message.channel.send(Utils.embed('Success', 'Softbanned ' + member.user.tag))
        } catch (e) {
            message.channel.send(Utils.errorEmbed("An error occured."));
        };
    }
}