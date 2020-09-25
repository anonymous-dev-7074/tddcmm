

exports.run = (client, msg, args) => {

if (!msg.member.hasPermission("MANAGE_CHANNELS")) {

  msg.reply('You do not have the required permissions to use this.')
  return;

}

if(args[0] === "all") {
  msg.guild.channels.filter(channel => channel.type !== "category") .forEach(channel => {
  let check = channel.permissionsFor(msg.guild.id)
if(!check.has("SEND_MESSAGES")) {
channel.updateOverwrite(msg.guild.id, {
  SEND_MESSAGES: false,
})
  
}
})
  msg.reply('Locked everything! :thumbsup:')
  return;
}
  let channel = msg.guild.channels.cache.find(c => c.name === args[0]) || msg.guild.channels.cache.get(args[0]) || msg.mentions.channels.first()
  if (!channel) channel = msg.channel;



let check = channel.permissionsFor(msg.guild.id)
if(!check.has("SEND_MESSAGES")) {
  channel.updateOverwrite(msg.guild.id, {
    SEND_MESSAGES: true,
  }).then(() => {
        msg.reply('Locked! :thumbsup:')
    }).then(() => {
msg.reply('Unlocked! :thumbsup:')  
}) 
 
 return;
}

if (channel.type === "voice" || channel.type === "category") return msg.reply("That was a category / voice channel, could not proceed.")

channel.updateOverwrite(msg.guild.id, {
  SEND_MESSAGES: false,
}).then(() => {
      msg.reply('Locked! :thumbsup:')
  })
 

}


  module.exports.help = {
    name:"lockdown",
    usage: 'Lock a channel down.',
  }