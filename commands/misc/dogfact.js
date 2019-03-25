const Command = require('../../Utils/command.js');
const axios = require('axios');
const { Utils } = require('../../index.js');

module.exports = class extends Command 
{
    constructor()
    {
        super({
            name: "dogfact", 
            description: "Gets a random dog fact.",
            usage: "dogfact",
        });
    }

    async execute(client, message, args)
    {
        let fact = await axios.get("https://some-random-api.ml/facts/dog").then(res => res.data);
        message.channel.send(Utils.embed("Dog Fact", fact.fact));
    }
}