const Command = require('../../Utils/command.js');
const { Utils } = require('../../index.js');

module.exports = class extends Command 
{
    constructor()
    {
        super({
            name: "autorole", 
            description: "Assigns the role to automatically give to new members, for this server.",
            usage: "autorole <role name | @role | role id | none>",
            permissions: ['MANAGE_ROLES']
        });
    }

    async execute(client, message, args)
    {
        if (!message.guild.me.hasPermission(['MANAGE_ROLES']))
            return message.channel.send(Utils.errorEmbed("I am missing the \`MANAGE_ROLES\` permission."));

        if (!args[1])
            return message.channel.send(Utils.usageError(this));

        if (args[1].toLowerCase() == 'none')
        {
            // clear autorole
            return message.channel.send(Utils.embed("Success", "Updated autorole."));
        }

        let role = (message.guild.roles.get(args[1]) || Utils.roleFromMention(args[1], message.guild)) || message.guild.roles.find(r => r.name.toLowerCase() == args.slice(1).join(' ').toLowerCase());
        if (!role) return message.channel.send(Utils.errorEmbed("Invalid role."));

        if (message.guild.me.highestRole.comparePositionTo(role) < 1)
            return message.channel.send(Utils.errorEmbed("I cannot assign new members the role " + role.name + " because it's role position is higher than mine, or equal."));
    }
}