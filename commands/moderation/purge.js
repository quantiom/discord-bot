const Command = require('../../Utils/command.js');
const { Utils } = require('../../index.js');

module.exports = class extends Command 
{
    constructor()
    {
        super({
            name: "purge", 
            description: "Bulk deletes the number of messages specified.",
            usage: "purge <1-100>",
            permissions: ['MANAGE_MESSAGES'],
            bot_permissions: ['MANAGE_MESSAGES'],
            aliases: ['delete']
        });
    }

    async execute(client, message, args)
    {
        if (!args[1] || isNaN(args[1]) || Number.parseInt(args[1]) > 100 || Number.parseInt(args[1] < 1))
            return message.channel.send(Utils.usageError(this));

        let num = Number.parseInt(args[1]);
        
        message.channel.bulkDelete(num, true).then(() => {
            return message.channel.send(Utils.embed("Success", `Purged ${num} messages.`)).then(m => m.delete(5000));
        }); 
    }
}