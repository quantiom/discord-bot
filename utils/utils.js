const { readdirSync, statSync } = require('fs')
const { join } = require('path')
const { RichEmbed } = require('discord.js');
const colors = require('colors');

class Utils
{
    static readDir(dir, files_or_dir = "dir") {
        if (files_or_dir == "dir") return readdirSync(dir).filter(f => statSync(join(dir, f)).isDirectory());
        if (files_or_dir == "files") return readdirSync(dir).filter(f => statSync(join(dir, f)).isFile() && f.endsWith('.js'))
    }

    static errorEmbed(msg)
    {
        return new RichEmbed()
            .setTitle('Error')
            .setDescription(msg)
            .setColor(0xf45342);
    };

    static log(msg)
    {
        let d = new Date();
        let timestamp = "[".white + (d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()).gray + "]".white + " ";

        console.log(timestamp + msg.white)
    };

    static userFromMention(mention)
    {
        let { client } = require('../index.js');
        const matches = mention.match(/^<@!?(\d+)>$/);
        if (!matches) return null;
        return client.users.get(matches[1]);
    }
}

module.exports = Utils;