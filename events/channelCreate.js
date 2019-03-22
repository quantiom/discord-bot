const { Utils } = require('../index.js');
const { RichEmbed } = require('discord.js');

module.exports = async (client, channel) => {
    if (channel.type == 'text')
    Utils.logCheck(channel.guild, 'channelCreate').then(logChannel => {
        if (!logChannel) return;

        logChannel.send(new RichEmbed()
            .setAuthor("Channel Created", client.user.displayAvatarURL)
            .addField("Channel Name", channel.toString())
            .addField("ID", channel.id)
            .setTimestamp()
            .setColor(Utils.red));
    });
};