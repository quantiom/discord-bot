const { Utils } = require('../index.js');
const { RichEmbed } = require('discord.js');

module.exports = async (client, role) => {
    Utils.logCheck(role.guild, 'roleCreate').then(logChannel => {
        if (!logChannel) return;

        logChannel.send(new RichEmbed()
            .setAuthor("Role Deleted", client.user.displayAvatarURL)
            .addField("Role Name", role.name)
            .addField("ID", role.id)
            .setTimestamp()
            .setColor(Utils.red));
    });
};