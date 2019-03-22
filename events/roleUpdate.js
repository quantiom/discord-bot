const { Utils } = require('../index.js');
const { RichEmbed } = require('discord.js');

module.exports = async (client, oldRole, newRole) => {
    Utils.logCheck(oldRole.guild, 'roleEdit').then(logChannel => {
        if (!logChannel) return;

        let logEmbed = new RichEmbed()
            .setAuthor("Role Updated", client.user.displayAvatarURL)
            .addField("ID", oldRole.id)
            .setTimestamp()
            .setColor(Utils.red);

        if (oldRole.name !== newRole.name)
            logEmbed.addField("Name (changed)", "~~" + oldRole.name + "~~\n**" + newRole.name + "**");
        else
            logEmbed.addField("Name (not changed)", oldRole.name);
        
        if (oldRole.permissions !== newRole.permissions)
            logEmbed.addField("Permissions (changed)", "~~[Click Here](https://discordapi.com/permissions.html#" + oldRole.permissions + ")~~\n" + "[Click here](https://discordapi.com/permissions.html#" + newRole.permissions + ")")
        else
            logEmbed.addField("Permissions (not changed)", "[Click Here](https://discordapi.com/permissions.html#" + oldRole.permissions + ")");
        
        if (oldRole.mentionable !== newRole.mentionable)
            logEmbed.addField("Mentionable (changed)", newRole.mentionable);
        else
            logEmbed.addField("Mentionable (not changed)", oldRole.mentionable);

        if (oldRole.hoist !== newRole.hoist)
            logEmbed.addField("Users Displayed Seperate (changed)", newRole.hoist);
        else
            logEmbed.addField("Users Displayed Seperate (not changed)", newRole.hoist);

        logChannel.send(logEmbed);
    });
};