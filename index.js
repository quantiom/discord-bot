const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const Handler = new (require('./utils/handler'))(client);
const Utils = new (require('./utils/utils'))(client);
const Web = require('./web/index');
const express = require('express');
const app = express();

module.exports = {
    Handler: Handler,
    Utils: Utils,
    config: config,
    client: client
}

client.login(config.token);
Handler.setupCommands(__dirname + '\\commands');
Handler.setupEvents(__dirname + '\\events');
Web.start(app, client);