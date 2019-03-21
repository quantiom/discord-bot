var sqlite = require('sqlite');
var { Handler } = require('../../');

module.exports = async (app, client) => {
	//let db = await sqlite.open('./database.sqlite')
	app.get('/', (req, res) => {
        res.render('pages/login', {client});
    });
    
    app.get('/commands', (req, res) => {
        res.render('pages/commands', {client, Handler});
    })
}