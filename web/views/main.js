const { Handler } = require('../../');
const Discord = require('discord.js');

module.exports = async (app, client) => {
	app.get('/', (req, res) => {
        if (!req.session.user) return res.render('pages/login', {req, client});
        res.render('pages/guilds', {req, client, Discord});
    });

    app.get('/servers/:id', async (req, res) => {
        if (!req.session.user) return res.redirect('/');

        let id = req.params.id;
        let check = false;

        await req.session.guilds.forEach(guild => {
            if (guild.id == id) check = guild;
        });

        if (!check) return res.redirect('/');

        let announcements = (await app.db.all('SELECT * FROM announcements WHERE guildid=? LIMIT 1', [req.params.id]))[0];
        let logging = (await app.db.all('SELECT * FROM logging WHERE guildid=? LIMIT 1', [req.params.id]))[0];
        let commands = (await app.db.all('SELECT * FROM commands WHERE guildid=?', [req.params.id]));

        res.render('pages/manageguild', {id, guild: client.guilds.get(check.id), client, announcements, logging, commands});
    })
    
    app.get('/commands', (req, res) => {
        res.render('pages/commands', {req, client, Handler});
    });

    app.get('/:id/:userid/warnings', async (req, res) => {
        let user = client.users.get(req.params.userid);
        let guild = client.guilds.get(req.params.id);
        if (!user || !guild) return res.redirect('/');
        
        let warnings = await app.db.all('SELECT * FROM warnings WHERE guildid=? AND userid=? ORDER BY time DESC', [req.params.id, req.params.userid]);
        res.render('pages/warnings', {req, client, Handler, user, warnings, guild});
    })
}