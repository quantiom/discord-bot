const { Handler } = require('../../');
const { Permissions } = require('discord.js');

function error(message, res)
{
    res.status(400).send({error: message});
    return;
}

function ok(message, res)
{
    res.status(200).send({success: message});
    return;
}

async function checkOwner(id, req, res)
{
    await req.session.guilds.forEach(g => {
        let perms = new Permissions(g.permissions);
        if (g.id == id && perms.has('ADMINISTRATOR')) return true;
    });
    
    return false;
}

module.exports = async (app, client) => {

      const modules = ['announcements', 'logging'];

	  app.get('/api/:id/updateSetting', async (req, res) => {
        res.status(400).send({error: "Error."})
      })
      
      app.post('/api/:id/addCommand', async (req, res) => {
      
        if (!req.session.user)
        return error("Not logged in.", res);
      
        if (!req.body.command || !req.body.response)
        return error("Invalid post data.", res);
      
        if (!checkOwner(req.params.id, req, res))
        return error("You do not have permission to modify this guild.", res);
      
        if (req.body.command.length > 50 || req.body.response.length > 500)
        return error("Your command or response is too long.", res);
      
        if (req.body.command.toLowerCase().startsWith(config.prefix.toLowerCase()))
        return error("Your command cannot start with " + config.prefix, res);

        var query = await app.db.all(`SELECT COUNT(id) FROM commands WHERE guildid = ${req.params.id}`);
      
        if (query[0]['COUNT(id)'] >= 20)
        return error("You may only have up to 20 custom commands.", res);
      
        var query = await app.db.run(`INSERT INTO commands (guildid, command, response) VALUES (${req.params.id}, ?, ?)`, [req.body.command, req.body.response]).then(after => {
          ok("Added command.:" + after.stmt.lastID, res);
        });
      });
      
      app.post('/api/:id/removeCommand', async (req, res) => {
        if (!req.session.user)
        return error("Not logged in.", res);
      
        if (!req.body.id)
        return error("Invalid post data.", res);
      
        if (!checkOwner(req.params.id, req, res))
        return error("You do not have permission to modify this guild.", res);
      
        if (isNaN(req.body.id))
        return error("Invalid post data.", res);

        var query = await app.db.all(`SELECT * FROM commands WHERE id = ?`, [req.body.id]);
      
        if (query[0].guildid != req.params.id)
        return error("Invalid ID; it is not for your guild.");
      
        var query = await app.db.run(`DELETE FROM commands WHERE id=?`, [req.body.id]);
      
        ok("Removed command.", res);
      })
      
      app.post('/api/:id/updateSetting', async (req, res) => {

          if (!req.session.user)
          return error("Not logged in.", res);
      
          if (!req.body.module || !req.body.setting || !req.body.value)
          return error("Invalid post data.", res);
      
          if (!checkOwner(req.params.id, req, res))
          return error("You do not have permission to modify this guild.", res);
      
          if (!modules.includes(req.body.module))
          return error("Unknown module.", res);
      
          if (req.body.module.toLowerCase() == 'announcements')
          {
            var possible = ['announceChannel', 'joinEnabled', 'leaveEnabled', 'joinMessage', 'leaveMessage'];
      
            if (!possible.includes(req.body.setting))
            return error("Invalid post data.", res);
      
            if (req.body.setting.includes("Enabled") && !( req.body.value.toString() === "true" || req.body.value.toString() === "false"))
            return error("Invalid bool.", res);
      
            if (req.body.value.length > 1999)
            return error("Value is too long.", res);
      
            let returnVal = 0;
            if (req.body.setting.includes("Enabled"))
            {
              if (req.body.value.toString() == "true") returnVal = 1;
            }
            else returnVal = req.body.value;

            app.db.run('UPDATE announcements SET ' + req.body.setting + ' = ? WHERE guildid = ?', [returnVal, req.params.id]);
      
            ok("Updated " + req.body.setting, res);
          }
      
          if (req.body.module.toLowerCase() == 'logging')
          {
            var possible = ['logChannel', 'messageEdits', 'messageDeletes', 'memberJoins', 'memberLeaves', 'memberBanned', 'memberUnbanned', 'channelCreate', 'channelDelete'
           , 'roleEdit', 'roleDelete', 'roleCreate', 'memberUsername', 'memberNickname', 'roleRemoved', 'roleGiven', 'memberKicked'];
      
            if (!possible.includes(req.body.setting))
            return error("Invalid post data.", res);
      
            if (req.body.setting !== 'logChannel' && !(req.body.value.toString() === "true" || req.body.value.toString() === "false"))
            return error("Invalid bool.", res);
      
            if (req.body.value.length > 1999)
            return error("Value is too long.", res);
      
            let returnVal = 0;
            if (req.body.setting !== 'logChannel')
            {
              if (req.body.value.toString() == "true") returnVal = 1;
            }
            else returnVal = req.body.value;

            app.db.run('UPDATE logging SET ' + req.body.setting + ' = ? WHERE guildid = ?', [returnVal, req.params.id]);
      
            ok("Updated " + req.body.setting, res);
          }
      });
}