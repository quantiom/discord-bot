class Command
{
    constructor(options)
    {
        this.name = options.name;
        this.description = options.description || 'Default description.';
        this.usage = options.usage || options.name;
        this.aliases = options.aliases || [];
    }
}

module.exports = Command;