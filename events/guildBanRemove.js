const { Utils } = require('../index.js');
const { RichEmbed } = require('discord.js');

module.exports = async (client, guild, user) => {
    Utils.logCheck(guild, 'memberUnbanned').then(logChannel => {
        if (!logChannel) return;

        logChannel.send(new RichEmbed()
            .setAuthor("User Unbanned", client.user.displayAvatarURL)
            .addField("Username", user.tag)
            .addField("ID", user.id)
            .setTimestamp()
            .setColor(Utils.red));
    });
}