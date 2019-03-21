const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const fs = require('fs');
const path = require('path');

module.exports.start = (app) => {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    //app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(session({
        store: new SQLiteStore,
        secret: 'ab189i2k390dladsfmasdam',
        cookie: { maxAge: 604800 * 1000 }, // "expires_in": 604800
        resave: false,
        saveUninitialized: true
    }));
    app.use(express.static(__dirname + '/views/public'));
    app.listen(3000);

    fs.readdirSync(__dirname + '/views').forEach(function(file) {
        var stat = fs.lstatSync(__dirname + '/views/' + file);
      
        if (file.toLowerCase().indexOf('.js') && !stat.isDirectory()) {
            require(__dirname + '/views/' + file)(app);
        }
    });
};