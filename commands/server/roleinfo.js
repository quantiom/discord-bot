const Command = require('../../Utils/command.js');
const { Utils } = require('../../index.js');

module.exports = class extends Command 
{
    constructor()
    {
        super({
            name: "roleinfo", 
            description: "Gives information about a role.",
            usage: "roleinfo <role name | role id | @role>"
        });
    }

    async execute(client, message, args)
    {
        if (!args[1])
            return message.channel.send(Utils.usageError(this));

        let role = (message.guild.roles.find(role => role.name.toLowerCase() == args.slice(1).join(' ').toLowerCase()) || Utils.roleFromMention(args[1])) || message.guild.roles.get(args[1]);
        if (!role)
            return message.channel.send(Utils.errorEmbed("Invalid role."));

        message.channel.send(Utils.embed("Role Info", "")
        .addField("Name", role.name, true)
        .addField("ID", role.id, true)
        .addField("Position", role.position, true)
        .addField("Color", (role.hexColor != "#000000" ? role.hexColor : "None"), true)
        .addField("Members", role.members.size, true)
        .addField("Hoisted", role.hoist ? "Yes" : "No", true)
        .addField("Mentionable", role.mentionable ? "Yes" : "No", true)
        .setColor(role.hexColor))
    }
}