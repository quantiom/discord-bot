const Command = require('../../Utils/command.js');

module.exports = class extends Command 
{
    constructor()
    {
        super({
            name: "testcmd", 
            description: "test desc",
            usage: "testcmd <abc>"
        });
    }

    async execute(client, message, args)
    {
        console.log(args);
    }
}