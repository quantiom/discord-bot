const Command = require('../../Utils/command.js');
const { Utils } = require('../../index.js');

module.exports = class extends Command 
{
    constructor()
    {
        super({
            name: "ping", 
            description: "Checks if the bot is online.",
            usage: "ping"
        });
    }

    async execute(client, message, args)
    {
        return message.channel.send({
            embed: Utils.embed("Ping", `Pong! ${Math.floor(client.ping)}ms`)
        });
    }
}