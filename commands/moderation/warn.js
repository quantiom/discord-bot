const Command = require('../../Utils/command.js');
const { Utils } = require('../../index.js');

module.exports = class extends Command 
{
    constructor()
    {
        super({
            name: "warn",
            description: "Warns a user.",
            usage: "warn <@user | userid> <reason>",
            permissions: ['MANAGE_GUILD'],
            bot_permissions: ['MANAGE_GUILD']
        });
    }

    async execute(client, message, args)
    {
        if (!args[1] || !args[2])
            return message.channel.send(Utils.usageError(this));

        let member = message.guild.members.get(args[1]) || Utils.memberFromMention(args[1], message.guild);
        if (!member) return message.channel.send(Utils.errorEmbed("Invalid member to warn."));

        let reason = args.slice(2).join(' ');
        if (reason.length > 500)   
            return message.channel.send(Utils.errorEmbed("Your reason is too long."));

        if (member.user.bot || member.user.id == message.author.id)
            return message.channel.send(Utils.errorEmbed("You cannot warn a bot, or yourself."));

        await Utils.db.run('INSERT INTO warnings (guildid, userid, reason, time, warned_by) VALUES (?, ?, ?, ?, ?)', [message.guild.id, member.user.id, reason, Date.now(), message.author.id]);

        return message.channel.send(Utils.embed("Success", `Warned ${member.user.tag}, you can view his/her warnings [here](http://localhost/${message.guild.id}/${member.user.id}/warnings).`)); 
    }
}