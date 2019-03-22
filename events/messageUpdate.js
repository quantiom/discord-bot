const { Utils } = require('../index.js');
const { RichEmbed } = require('discord.js');

module.exports = async (client, oldMessage, newMessage) => {

    if (oldMessage.author.bot) return;

    if (oldMessage.channel.type !== 'text') return;
    if (oldMessage.content == newMessage.content) return;

    Utils.logCheck(oldMessage.guild, 'messageEdits').then(logChannel => {
        if (!logChannel) return;  

        oldReduced = oldMessage.content;
        if (oldMessage.content.length > 1024)
            oldReduced = oldMessage.content.slice(0, 1021) + "...";

        newReduced = newMessage.content;
        if (newMessage.content.length > 1024)
            newReduced = newMessage.content.slice(0, 1021) + "...";

        logChannel.send(new RichEmbed()
            .setAuthor(newMessage.author.tag, newMessage.author.displayAvatarURL)
            .setDescription(`Message Edited ([Jump to message](https://discordapp.com/channels/${oldMessage.guild.id}/${oldMessage.channel.id}/${oldMessage.id}))`)
            .addField("Before", oldReduced)
            .addField("After", newReduced)
            .setColor(Utils.red)
            .setTimestamp()
            .setFooter(`Sent by ${newMessage.author.tag} (${newMessage.author.id}) in #${newMessage.channel.name}`));
    });
}