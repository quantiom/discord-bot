const Command = require('../../Utils/command.js');
const config = require('../../config.json');
const { RichEmbed } = require('discord.js');
const { Handler, Utils } = require('../../index.js');

module.exports = class extends Command 
{
    constructor()
    {
        super({
            name: "help", 
            description: "shows this shit",
            usage: "help |command|"
        });
    }

    async execute(client, message, args)
    {
        let helpEmbed = new RichEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL)
            .setDescription(`Prefix: \`${config.prefix}\`\nUse \`${config.prefix}help <command name>\` to get information on a certain command.`)
            .setColor(0xd83232);

        Handler.categories.forEach((commands, category) => {
            helpEmbed.addField(`${category} (${commands.length})`, commands.map(cmd => `\`${cmd.name}\``).join('\n'));
        });

        message.channel.send(helpEmbed);
    }
}