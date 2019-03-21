const { readdirSync, statSync } = require('fs')
const { join } = require('path')
const { RichEmbed } = require('discord.js');
const colors = require('colors');

class Utils
{
    constructor(client)
    {
        this.client = client;
        this.red = 0xd83232;
    }

    static readDir(dir, files_or_dir = "dir") {
        if (files_or_dir == "dir") return readdirSync(dir).filter(f => statSync(join(dir, f)).isDirectory());
        if (files_or_dir == "files") return readdirSync(dir).filter(f => statSync(join(dir, f)).isFile() && f.endsWith('.js'))
    }

    static errorEmbed(msg)
    {
        return new RichEmbed()
            .setTitle('Error')
            .setDescription(msg)
            .setColor(this.red);
    };

    embed(title, desc)
    {
        return new RichEmbed()
            .setAuthor(title, this.client.user.displayAvatarURL)
            .setDescription(desc)
            .setColor(this.red);
    }

    log(msg)
    {
        let d = new Date();
        let timestamp = "[".white + (d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()).gray + "]".white + " ";

        console.log(timestamp + msg.white)
    };

    userFromMention(mention)
    {
        const matches = mention.match(/^<@!?(\d+)>$/);
        if (!matches) return null;
        return this.client.users.get(matches[1]);
    }
}

module.exports = Utils;