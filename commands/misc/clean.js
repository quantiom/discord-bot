const Command = require('../../Utils/command.js');
const { Utils } = require('../../index.js');

module.exports = class extends Command 
{
    constructor()
    {
        super({
            name: "clean", 
            description: "Clears the bot's responses, in the last 100 messages.",
            usage: "clean",
            permissions: ['MANAGE_MESSAGES'],
            bot_permissions: ['MANAGE_MESSAGES']
        });
    }

    async execute(client, message, args)
    {
        let toDelete = [];

        await message.channel.fetchMessages({limit: 100}).then(messages => {
            messages.forEach(msg => {
                if (msg.author.id == client.user.id)
                    toDelete.push(msg.id);
            });
        });

        if (toDelete.length > 0)
            message.channel.bulkDelete(toDelete, true);
    }
}