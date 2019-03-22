const { Utils } = require('../index.js');
const { RichEmbed } = require('discord.js');

module.exports = async (client, channel) => {
    if (channel.type == 'text')
    Utils.logCheck(channel.guild, 'channelDelete').then(logChannel => {
        if (!logChannel) return;

        logChannel.send(new RichEmbed()
            .setAuthor("Channel Deleted", client.user.displayAvatarURL)
            .addField("Channel Name", "#" + channel.name)
            .addField("ID", channel.id)
            .setTimestamp()
            .setColor(Utils.red));
    });
};