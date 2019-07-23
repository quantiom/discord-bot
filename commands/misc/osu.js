const Command = require('../../Utils/command.js');
const { Utils } = require('../../index.js');
const osu = require('node-osu');
const { config } = require('../../index.js');

const osuApi = new osu.Api(config.osuApiKey, {
    completeScores: false,
    notFoundAsError: false
});

const numberWithCommas = (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

module.exports = class extends Command 
{
    constructor()
    {
        super({
            name: "osu", 
            description: "Gives you info about osu players, through the osu api.",
            usage: "osu <username>",
            aliases: ['osu!']
        });
    }

    async execute(client, message, args)
    {
        if (!args[1])
            return message.channel.send(Utils.usageError(this));

        let username = args[1];
        let user = await osuApi.getUser({u: username});

        if (!user || user.length == 0)
            return message.channel.send(Utils.errorEmbed("Invalid user."));
        
        message.channel.send(
            Utils.embed("Userinfo", "Displaying the userinfo of the \`"+user.name+"\`")
            .addField("ID", user.id, true)
            .addField("Username", user.name, true)
            .addField("Accuracy", Number.parseFloat(user.accuracy).toFixed(2), true)
            .addField("Level", Math.floor(user.level), true)
            .addField("Country", user.country, true)
            .addField("50s", numberWithCommas(user.counts['50']), true)
            .addField("100s", numberWithCommas(user.counts['100']), true)
            .addField("300s", numberWithCommas(user.counts['300']), true)
            .addField("Ranked Score", numberWithCommas(user.scores.ranked), true)
            .addField("Total PP", numberWithCommas(user.pp.raw), true)
            .addField("Global Rank", "#" + numberWithCommas(user.pp.rank), true)
            .addField("Country Rank", "#" + numberWithCommas(user.pp.countryRank), true)
        );
    }
}
