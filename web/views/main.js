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

        app.db.all('SELECT * FROM announcements WHERE guildid=?', [req.params.id]).then(announcements => {
            res.render('pages/manageguild', {id, guild: client.guilds.get(check.id), client, announcements});
        });
    })
    
    app.get('/commands', (req, res) => {
        res.render('pages/commands', {req, client, Handler});
    });
}