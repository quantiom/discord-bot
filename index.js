const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const Handler = new (require('./utils/handler.js'))(client);
const Utils = require('./utils/utils.js');

module.exports = {
    Handler: Handler,
    Utils: Utils,
    config: config,
    client: client
}

client.login(config.token);
Handler.setupCommands(__dirname + '\\commands');
Handler.setupEvents(__dirname + '\\events');