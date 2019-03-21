var sqlite = require('sqlite');
var { Handler } = require('../../');

module.exports = async (app, client) => {
	app.get('/', (req, res) => {
        if (!req.session.user)
            res.render('pages/login', {req, client});
        else
            res.render('pages/guilds', {req, client, Handler});
    });
    
    app.get('/commands', (req, res) => {
        res.render('pages/commands', {req, client, Handler});
    });
}