const Command = require('../../Utils/command.js');
const { Utils } = require('../../index.js');

module.exports = class extends Command 
{
    constructor()
    {
        super({
            name: "coinflip", 
            description: "Flip a coin.",
            usage: "coinflip",
            aliases: ['flip']
        });
    }

    async execute(client, message, args)
    {
        if (Math.floor(Math.random() * Math.floor(2))) return message.channel.send(Utils.embed("Coinflip", "The coin landed on tails."));
        message.channel.send(Utils.embed("Coinflip", "The coin landed on heads."));
    }
}