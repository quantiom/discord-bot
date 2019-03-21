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
            .setDescription(`Use \`${config.prefix}help <command name>\` to get information on a certain command.\n\`<param>\` = Required\n\`|param|\` = Optional`)
            .setColor(0xd83232)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL);

        Handler.categories.keyArray().forEach(cat => {
            let toAdd = '';
            Handler.categories.get(cat).forEach(cmd => {
                toAdd += cmd.name;
            })
            helpEmbed.addField(cat, toAdd);
        });

        message.channel.send(helpEmbed);
    }
}