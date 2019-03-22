class Command
{
    constructor(options)
    {
        this.name = options.name;
        this.description = options.description || 'Default description.';
        this.usage = options.usage || options.name;
        this.aliases = options.aliases || [];
        this.type = options.type || 'text';
        this.permissions = options.permissions || [];
        this.bot_permissions = options.bot_permissions || [];
    }
}

module.exports = Command;