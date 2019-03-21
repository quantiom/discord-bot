const { Utils } = require('../index.js');

module.exports = async (client) => {
	
	Utils.log("Logged in as " + client.user.tag);
}