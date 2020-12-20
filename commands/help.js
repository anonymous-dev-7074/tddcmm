const { MessageEmbed } = require('discord.js')

exports.run = (client, msg, args) => {

  
  if (!args[0]) {
    let embed = new MessageEmbed()
    .addField('<a:upn:778449425580294174>**┃MISCELLANEOUS**', '`help` `prefix` `support` `settings` `embed` `av` `invite`')
    .addField('<a:cd_1:778450226787778572>**┃MUSIC**', '`loop` `lyrics` `nowplaying` `pause` `play` `playlist` `pruning` `queue` `remove` `resume` `search` `shuffle` `skip` `skipto` `stop` `volume`')
    .addField('<a:kjsc:778449744300081222>┃**LEVEL SYSTEM**', '`removelevelrole` `levelroles` `level`, `leaderboard` `set-levelchannel` `resetall` `addlevelrole` `set-xpgain` `set-noxprole` `set-levelmessage`, `setlevel`, `set-noxprole` `set-noxpchannel` `add-doublexprole` `disablelevelsystem`')
    .addField('<a:info5:778449861112365067>┃**REACTION ROLES**', '`addreactionrole` `removereactionrole` `reactionroles`')
    .addField('<a:8780_discord_geaz:778450033867489292>┃**MODERATION**', '`addrole` `purge` `imageonly` `anti-invite` `ban` `kick` `mute` `unmute` `softban`')
    .addField('<:members5:778449689179717672>┃**ROLE SYSTEM**', '`roles` `addpublicrole` `setrolechannel`')
    .addField('<a:22:778450157636157441>┃**WELCOME SYSTEM**', '`welcome`')
    .addField('<:custom5:778464394837098516>┃**APPLICATION SYSTEM**', '`application-setup` `application-deny` `application-accept` `applications`')
    .addField('<a:WumpusHidingInHypeSquad:778449400858148886>┃**USER CHANNELS**', '`userchannels-setup` `join` `uckick`')
    .setImage("https://cdn.discordapp.com/attachments/768524656747085896/777720602420445254/20201116_075308.gif")
    .setColor("#0a0a0b")
    
    msg.channel.send(embed)
    return;
  }

  if (!client.commands.get(args[0])) return msg.channel.send('I could not find a command with that name.')
  
  let array = client.commands.map(x => x)

 let data = array.findIndex(obj => obj.help.name == args[0])

  let embed = new MessageEmbed()
  .setTitle(`${args[0]}`)
  .setDescription(`Name: **${array[data].help.name}**\nUsage: **${array[data].help.usage}**`)
  .setColor("#0a0a0b")
  msg.channel.send(embed)



}

module.exports.help = {
    name:"help",
    aliases: [],
    usage: "!help || !help <command>",
    group: "misc"
}
