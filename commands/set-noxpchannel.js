

let { MessageEmbed } = require('discord.js')
exports.run = (client, msg, args) => {

  
  if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send('You do not have the required permission to use this command.').then(m => {
    setTimeout(() => {
        m.delete()
    }, 3000);
})
  if (!args[0]) return msg.channel.send(`You forgot the channel.`)

  let channel = msg.guild.channels.cache.find(c => c.name === args[0]) || msg.mentions.channels.first()

  if (!channel) return msg.channel.send('I could not find that channel!')

  let array = client.settings.get(msg.guild.id, "noxpchannels")
  if (array.includes(channel.id)) {
    let index = array.findIndex(obj => obj === channel.id)
    client.settings.delete(msg.guild.id, `noxpchannels.${index}`)
    msg.channel.send('You already had that channel disabled to get xp in, I removed it from the list. You will now get xp again.')
    return;
  }



 client.settings.push(msg.guild.id, channel.id, "noxpchannels")
 msg.channel.send(`XP will not be gained in ${channel} anymore.`)
   

  


}

module.exports.help = {
    name:"set-noxpchannel",
    usage: "!set-noxpchannel <channel> | !set-noxpchannel #channel"
  }