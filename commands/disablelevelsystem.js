const { Util } = require('discord.js')
module.exports.run = async (client, msg, args) => {

if (!msg.member.hasPermission("ADMINISTRATOR")) {
	msg.reply('You do not have the required permissions.')
	return;
}

  let check = client.settings.get(msg.guild.id, "levelsystem")
  if(check === false) {
  	msg.reply('enabled the level system. :thumbsup:')
  	client.settings.set(msg.guild.id, true, "levelsystem")
  } else if (check === true) {
  	  	msg.reply('disabled the level system. :thumbsup:')
  	client.settings.set(msg.guild.id, false, "levelsystem")
  }

}

exports.help = {
	name:"disablelevelsystem",
        aliases: [],
	usage: "disablelevelsystem",
}
