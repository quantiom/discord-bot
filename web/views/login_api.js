const { URLSearchParams } = require('url');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);

module.exports = async (app, client) => {
	app.get('/login', async (req, res) => {
        res.redirect('https://discordapp.com/oauth2/authorize?redirect_uri=http://localhost:3000/callback&scope=identify%20guilds%20email&response_type=code&client_id=501266577774215168')
    })

    app.get('/callback', async (req, res) => {
        if (!req.query.code) return res.redirect('/');
	    
        let params = new URLSearchParams();
        params.append('client_id', 'xxx');
        params.append('client_secret', 'xxx');
        params.append('grant_type', 'authorization_code');
        params.append('code', req.query.code);
        params.append('redirect_uri', 'http://localhost:3000/callback');
        params.append('scope', 'identify guilds email');
    
        await fetch('https://discordapp.com/api/oauth2/token', {
            method: 'POST',
            body: params,
            headers: { 'content-type': 'application/x-www-form-urlencoded' }
        }).then(res => res.json())
            .then(async token_response => {
                if (token_response.error) return res.redirect('/');
                let access_token = token_response.access_token;
                await fetch('https://discordapp.com/api/users/@me', {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${access_token}` }
                }).then(res => res.json()).then(user_response => {
                    if (user_response.error) return res.redirect('/');
                    req.session.logged_in = true;
                    req.session.user = user_response;
                })
    
                await fetch('https://discordapp.com/api/users/@me/guilds', {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${access_token}` }
                }).then(res => res.json()).then(guild_response => {
                    if (guild_response.error) return res.redirect('/');
                    req.session.guilds = guild_response;
                })
    
                res.redirect('/');
            });
    
    });

    app.get('/logout', async (req, res) => {
        await req.session.destroy();
        return res.redirect('/');
    });
}
