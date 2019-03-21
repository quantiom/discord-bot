const { Utils } = require('../index.js');

module.exports = async (client, guild) => {
    let announcements = await Utils.db.all('SELECT * FROM announcements WHERE guildid=?', [guild.id]);
    let logging = await Utils.db.all('SELECT * FROM logging WHERE guildid=?', [guild.id]);

    if (!announcements[0])
        Utils.db.run('INSERT INTO announcements (guildid) VALUES (?)', [guild.id]);
    
    if (!logging[0])
        Utils.db.run('INSERT INTO logging (guildid) VALUES (?)', [guild.id]);
};