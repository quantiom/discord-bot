const Command = require('../../Utils/command.js');
const { Utils } = require('../../index.js');

module.exports = class extends Command 
{
    constructor()
    {
        super({
            name: "webpanel", 
            description: "Links you to the webpanel.",
            usage: "webpanel"
        });
    }

    async execute(client, message, args)
    {
        return message.channel.send(Utils.embed("Webpanel", `You can get to the webpanel [here](http://localhost:3000).`));
    }
}