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
            description: "Used to get all the commands, or info on a certain command.",
            usage: "help |command|",
            aliases: ['h']
        });
    }

    async execute(client, message, args)
    {
        if (args[1])
        {
            let command = Handler.commands.get(args[1].toLowerCase()) || Handler.aliases.get(args[1].toLowerCase());
            if (!command)
                return message.channel.send(Utils.embed("Help", "Invalid command."));

            let commandEmbed = new RichEmbed()
                .setAuthor('Help', client.user.displayAvatarURL)
                .setColor(Utils.red)
                .addField('Usage', command.usage)
                .addField('Description', command.description)

            if (command.aliases.length > 0)
                commandEmbed.addField('Aliases', command.aliases.map(alias => alias).join(', '));

            message.channel.send(commandEmbed);
        } else {
            let helpEmbed = new RichEmbed()
                .setAuthor('Help', client.user.displayAvatarURL)
                .setDescription(`Prefix: \`${config.prefix}\`\nUse \`${config.prefix}help <command name>\` to get information on a certain command.\n\`<>\` = required, and \`||\` = optional.`)
                .setColor(Utils.red);

            Handler.categories.forEach((commands, category) => {
                helpEmbed.addField(`${category} (${commands.length})`, commands.map(cmd => `\`${cmd.name}\``).join('\n'));
            });

            try {
                message.channel.send(Utils.embed("Help", "I've sent you a PM with all the commands."));
                message.author.send(helpEmbed);
            } catch (e) {
                message.channel.send(helpEmbed);
            }
        }
    }
}