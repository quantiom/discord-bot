const Command = require('../../Utils/command.js');

module.exports = class extends Command 
{
    constructor()
    {
        super({
            name: "roles", 
            description: "Gives a list of roles.",
            usage: "roles"
        });
    }

    async execute(client, message, args)
    {
        let msg = "\`\`\`\n";
        let longest = 0;
        
        // idk if there is a better way to do this other than using 2 loops
        await message.guild.roles.forEach(role => {
            if (role.name.length > longest) longest = role.name.length + 1;
        });
        
        await message.guild.roles.forEach(role => {
            if (role.id !== message.guild.id) {
                let spaces = (longest - role.name.length);
                msg += role.name + " ".repeat(spaces) + role.members.size + " members\n";
            }
        });

        if (msg.length < 2000)
            message.channel.send(msg + "\`\`\`");
    }
}