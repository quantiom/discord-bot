const { Utils } = require('../index.js');
const { RichEmbed } = require('discord.js');

module.exports = async (client, guild, user) => {
    Utils.logCheck(guild, 'memberBanned').then(logChannel => {
        if (!logChannel) return;

        logChannel.send(new RichEmbed()
            .setAuthor("Member Banned", client.user.displayAvatarURL)
            .addField("Username", user.tag)
            .addField("ID", user.id)
            .setTimestamp()
            .setColor(Utils.red))
    });
}