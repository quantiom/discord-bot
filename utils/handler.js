const Utils = require('./utils.js');
const Enmap = require('enmap');

class Handler 
{
    constructor(client)
    {
        this.commands = new Enmap();
        this.aliases = new Enmap();
        this.categories = new Enmap();
        this.client = client;
    }

    async setupCommands(commandDir)
    {
        await Utils.readDir(commandDir).forEach(category => {
            this.categories.ensure(category, []);
            Utils.readDir(`${commandDir}/${category}`, 'files').forEach(command => {
                command = command.split('.')[0];
                let props = require(`${commandDir}/${category}/${command}.js`);
                let cmd_obj = new props();
                this.categories.push(category, cmd_obj);
                cmd_obj.category = category;
                this.commands.set(command, cmd_obj);
                if (cmd_obj.aliases && cmd_obj.aliases.length > 0)
                cmd_obj.aliases.forEach(alias => {
                    this.aliases.set(alias, cmd_obj);
                });
            });
        });

        return true;
    };

    async setupEvents(eventDir)
    {
        await Utils.readDir(eventDir, 'files').forEach(event => {
            let event_obj = require(`${eventDir}/${event}`);
            this.client.on(event.split('.')[0], event_obj.bind(null, this.client));
            delete require.cache[require.resolve(`${eventDir}/${event}`)];
        });
    };
}

module.exports = Handler;