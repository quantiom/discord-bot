const Command = require('../../Utils/command.js');
const { Utils } = require('../../index.js');

module.exports = class extends Command 
{
    constructor()
    {
        super({
            name: "setnick", 
            description: "Sets the nickname of a member.",
            usage: "setnick <@user | userid> <nickname>",
            permissions: ['MANAGE_NICKNAMES'],
            bot_permissions: ['MANAGE_NICKNAMES'],
            aliases: ['nick']
        });
    }

    async execute(client, message, args)
    {
        if (!args[1] || !args[2])
            return message.channel.send(Utils.usageError(this));

        let member = message.guild.members.get(args[1]) || Utils.memberFromMention(args[1], message.guild);
        if (!member) return message.channel.send(Utils.errorEmbed("Invalid member."));
        
        try {
            if (member.highestRole.position >= message.guild.me.highestRole.position && member.user.id != client.user.id || member.user.id == message.guild.ownerID)
                return message.channel.send(Utils.errorEmbed("I do not have permission to edit the nickname of " + member));

            member.setNickname(args.slice(2).join(' ')).then(() => {
                message.channel.send(Utils.embed("Success", "Updated the nickname of " + member));
            });
        } catch (e) {
            message.channel.send(Utils.errorEmbed("An error occured."));
        }
    }
}