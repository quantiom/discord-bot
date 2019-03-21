var sqlite = require('sqlite');
var { Handler } = require('../../');

module.exports = async (app, client) => {

	app.get('/', (req, res) => {
        res.render('pages/login', {req, client});
    });
    
    app.get('/commands', (req, res) => {
        res.render('pages/commands', {req, client, Handler});
    });
}