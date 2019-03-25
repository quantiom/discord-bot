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
            permissions: ['MANAGE_ROLES'],
            bot_permissions: ['MANAGE_ROLES']
        });
    }

    async execute(client, message, args)
    {
        if (!args[1])
            return message.channel.send(Utils.usageError(this));

        if (args[1].toLowerCase() == 'none')
        {
            Utils.db.all('SELECT * FROM autorole WHERE guildid=?', [message.guild.id]).then(q => {
                if (q && q.length > 0) Utils.db.run('UPDATE autorole SET roleid=NULL WHERE guildid=?', [message.guild.id]);
            })
            return message.channel.send(Utils.embed("Success", "Updated autorole."));
        };

        let role = (message.guild.roles.get(args[1]) || Utils.roleFromMention(args[1], message.guild)) || message.guild.roles.find(r => r.name.toLowerCase() == args.slice(1).join(' ').toLowerCase());
        if (!role) return message.channel.send(Utils.errorEmbed("Invalid role."));

        if (role.managed)
            return message.channel.send(Utils.errorEmbed("This role is managed by an external service, I cannot add/remove it from members."));

        if (message.guild.me.highestRole.comparePositionTo(role) < 1)
            return message.channel.send(Utils.errorEmbed("I cannot assign new members the role " + role.name + " because it's role position is higher than mine, or equal."));
    
        Utils.db.all('SELECT * FROM autorole WHERE guildid=?', [message.guild.id]).then(q => {
            if (!q || q.length == 0) return Utils.db.run('INSERT INTO autorole (guildid, roleid) VALUES (?, ?)', [message.guild.id, role.id]);
            Utils.db.run('UPDATE autorole SET roleid=? WHERE guildid=?', [role.id, message.guild.id]);
        });
        
        return message.channel.send(Utils.embed("Success", "Updated autorole.")); 
    }
}