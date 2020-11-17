let { MessageEmbed } = require('discord.js')
exports.run = (client, msg, args) => {

  
  if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send('You do not have the required permission to use this command.').then(m => {
    setTimeout(() => {
        m.delete()
    }, 3000);
})

  if (!args[0]) return msg.channel.send(`You forgot the channel.`)
  if (args[0] === "none") {
    client.settings.set(msg.guild.id, "none", "roleschannel")
    msg.reply('Successfully disabled the roles channel.')
    return;
  }
  let channel = msg.guild.channels.cache.find(c => c.name === args[0]) || msg.mentions.channels.first()

  if (!channel) return msg.channel.send('I could not find that channel!')

  let array = client.settings.get(msg.guild.id, "roleschannel")
   
   
   
   
 client.settings.set(msg.guild.id, channel.id, "roleschannel")
 msg.channel.send(`Set the !role command to be used in ${channel}.`)
   
   
   
   
   
}

module.exports.help = {
    name:"setrolechannel",
    aliases : [] ,
    usage: "!setrolechannel <channel> | !setrolechannel #channel | !setrolechannel none"
  } 
