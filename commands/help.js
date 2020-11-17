const { MessageEmbed } = require('discord.js')

exports.run = (client, msg, args) => {

  
  if (!args[0]) {
    let embed = new MessageEmbed()
    .addField('<:misc:778289440333496360>**┃MISCELLANEOUS**', '`help` `prefix` `support` `settings` `embed` `av` `invite`')
    .addField('<a:aMusic:778296399376810004>**┃MUSIC**', '`loop` `lyrics` `nowplaying` `pause` `play` `playlist` `pruning` `queue` `remove` `resume` `search` `shuffle` `skip` `skipto` `stop` `volume`')
    .addField('<:leaderboard:778297450565730314>┃**LEVEL SYSTEM**', '`removelevelrole` `levelroles` `level`, `leaderboard` `set-levelchannel` `resetall` `addlevelrole` `set-xpgain` `set-noxprole` `set-levelmessage`, `setlevel`, `set-noxprole` `set-noxpchannel` `add-doublexprole` `disablelevelsystem`')
    .addField('<:a_rolechangeticket:778291006550442045>┃**REACTION ROLES**', '`addreactionrole` `removereactionrole` `reactionroles`')
    .addField('<:clear:778289089245609984>┃**MODERATION**', '`addrole` `purge` `imageonly` `anti-invite` `ban` `kick` `mute` `unmute` `softban`')
    .addField('<:commands:778300060386721793>┃**ROLE SYSTEM**', '`roles` `addpublicrole` `setrolechannel`')
    .addField('<a:announce:759343564819398667>┃**WELCOME SYSTEM**', '`welcome`')
    .addField('<:messages:778289415171735563>┃**APPLICATION SYSTEM**', '`application-setup` `application-deny` `application-accept` `applications`')
    .addField('<:add:778289156065198102>┃**USER CHANNELS**', '`userchannels-setup` `join` `uckick`')
    .setImage("https://cdn.discordapp.com/attachments/768524656747085896/777720602420445254/20201116_075308.gif")
    .setColor("#FFFFFF")
    .setFooter("To view extra information about a command, use !help <command>")
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
