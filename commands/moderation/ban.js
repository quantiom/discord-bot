const Command = require('../../Utils/command.js');
const { Utils } = require('../../index.js');

module.exports = class extends Command 
{
    constructor()
    {
        super({
            name: "ban", 
            description: "Bans a user.",
            usage: "ban <@user | userid> |delete message history from 0-7 days| |reason|",
            permissions: ['BAN_MEMBERS'],
            bot_permissions: ['BAN_MEMBERS']
        });
    }

    async execute(client, message, args)
    {
        if (!args[1])
            return message.channel.send(Utils.usageError(this));

        let member = message.guild.members.get(args[1]) || Utils.memberFromMention(args[1], message.guild);
        if (!member) return message.channel.send(Utils.errorEmbed("Invalid member to ban."));

        if (!member.bannable)
            return message.channel.send(Utils.errorEmbed("I cannot ban this member, his/her role may be above mine, or they may be the owner of the server."));

        let days = args[2] || 0;
        if (isNaN(days) || days < 0 || days > 7)
            return message.channel.send(Utils.errorEmbed("Invalid days to delete message history from, it must be a number from 0-7."));
        
        let reason = "Banned by " + message.author.tag + ".";
        if (args[3])
            reason = "Banned by " + message.author.tag + ". Reason: " + args.slice(3).join(' ');

        try {
            member.ban({days: days, reason: reason});
        } catch (e) {
            message.channel.send(Utils.errorEmbed("An error occured."));
        };
    }
}