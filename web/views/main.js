var sqlite = require('sqlite');

module.exports = async function(app) {
	//let db = await sqlite.open('./database.sqlite')
	app.get('/', (req, res) => {
        res.render('pages/index');
	})
}