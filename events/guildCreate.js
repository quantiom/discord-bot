const { Utils } = require('../index.js');

module.exports = async (client, guild) => {
    Utils.db.run('INSERT INTO announcements (guildid) VALUES (?)', [guild.id]);
};