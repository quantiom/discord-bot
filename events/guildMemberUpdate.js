const { Utils } = require('../index.js');
const { RichEmbed } = require('discord.js');

async function nicknameChange(client, oldMember, newMember)
{
    if (oldMember.nickname == newMember.nickname) return;

    Utils.logCheck(newMember.guild, 'memberNickname').then(logChannel => {
        if (!logChannel) return;
        
        logChannel.send(new RichEmbed()
        .setAuthor("Nickname Changed", newMember.user.displayAvatarURL)
        .addField("User", newMember.user.tag)
        .addField("Before", oldMember.nickname ? oldMember.nickname : "None")
        .addField("After", newMember.nickname ? newMember.nickname : "None")
        .setThumbnail(newMember.user.displayAvatarURL)
        .setTimestamp()
        .setColor(Utils.red))
    });
};

async function roleGiven(client, oldMember, newMember)
{
    if (oldMember.roles == newMember.roles) return;

    Utils.logCheck(newMember.guild, 'roleGiven').then(logChannel => {
        if (!logChannel) return;

        let addedRole = newMember.roles.filter(role => !oldMember.roles.has(role.id));
        if (!addedRole.first()) return;

        logChannel.send(new RichEmbed()
            .setAuthor("Role Given", client.user.displayAvatarURL)
            .addField("User", newMember.user.tag + " (" + newMember.user.id + ")")
            .addField("Role", addedRole.first().name + " ("+addedRole.first().id+")")
            .setThumbnail(newMember.user.displayAvatarURL)
            .setTimestamp()
            .setColor(Utils.red))
    });
};

async function roleRemoved(client, oldMember, newMember)
{
    if (oldMember.roles == newMember.roles) return;

    Utils.logCheck(newMember.guild, 'roleRemoved').then(logChannel => {
        if (!logChannel) return;

        let removedRole = oldMember.roles.filter(role => !newMember.roles.has(role.id));
        if (!removedRole.first()) return;

        logChannel.send(new RichEmbed()
            .setAuthor("Role Removed", client.user.displayAvatarURL)
            .addField("User", newMember.user.tag + " (" + newMember.user.id + ")")
            .addField("Role", removedRole.first().name + " ("+removedRole.first().id+")")
            .setThumbnail(newMember.user.displayAvatarURL)
            .setTimestamp()
            .setColor(Utils.red))
    });
}

module.exports = async (client, oldMember, newMember) => {
    // I guess this makes it more easy to find what you are looking for, rather than putting everything in here /s
    nicknameChange(client, oldMember, newMember);
    roleGiven(client, oldMember, newMember);
    roleRemoved(client, oldMember, newMember);
}