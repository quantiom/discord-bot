const { Utils, Handler, config } = require('../index.js');

module.exports = async (client, message) => {
    if (message.author.id == client.user.id) return;
    if (message.content.indexOf(config.prefix) != 0) return;

    const args = message.content.split(/ +/g);
    const command = args.shift().slice(config.prefix.length).toLowerCase();
    const cmd = Handler.commands.get(command) || Handler.aliases.get(command);

    if (!cmd) return;

    cmd.execute(client, message, message.content.split(' '));
}