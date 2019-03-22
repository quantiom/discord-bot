const Command = require('../../Utils/command.js');
const { Utils } = require('../../index.js');

module.exports = class extends Command 
{
    constructor()
    {
        super({
            name: "kick", 
            description: "Kicks a user.",
            usage: "kick <@user | userid> |reason|",
            permissions: ['KICK_MEMBERS'],
            bot_permissions: ['KICK_MEMBERS']
        });
    }

    async execute(client, message, args)
    {
        if (!args[1])
            return message.channel.send(Utils.usageError(this));

        let member = message.guild.members.get(args[1]) || Utils.memberFromMention(args[1], message.guild);
        if (!member) return message.channel.send(Utils.errorEmbed("Invalid member to kick."));

        if (!member.kickable)
            return message.channel.send(Utils.errorEmbed("I cannot kick this member, his/her role may be above mine, or they may be the owner of the server."));

        let reason = "Kicked by " + message.author.tag + ". Reason: " + args.slice(2).join(' ') || "Kicked by " + message.author.tag + ".";

        member.kick(reason)

        return message.channel.send(Utils.embed("Success", `Kicked ${member.user.tag}.`)); 
    }
}