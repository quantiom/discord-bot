const Command = require('../../Utils/command.js');
const axios = require('axios');
const { Utils } = require('../../index.js');

module.exports = class extends Command 
{
    constructor()
    {
        super({
            name: "djs", 
            description: "Searches the Discord.JS documentation.",
            usage: "djs <query>",
            aliases: ['discord.js', 'discordjs']
        });
    }

    async execute(client, message, args)
    {
        if (!args[1]) return message.channel.send(Utils.usageError(this));
        const embed = await axios.get("https://djsdocs.sorta.moe/main/stable/embed?q=" + message.content.split(' ').slice(1).join(' ')).then(res => res.data);
        message.channel.send({ embed });
    }
}