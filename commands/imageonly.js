
const { MessageEmbed } = require('discord.js')

exports.run = (client, msg, args) => {

    if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send('You do not have the required permission to use this command.').then(m => {
        setTimeout(() => {
            m.delete()
        }, 3000);
    })


      if (!args[0]) return msg.channel.send(`You forgot the channel.`)

    let channel = msg.guild.channels.cache.find(c => c.name === args[0]) || msg.mentions.channels.first()

    if (!channel) return msg.channel.send('I could not find that channel!')

    let array = client.settings.get(msg.guild.id, "imagechannel")
   
    if (array.includes(channel.id)) {
        let index = array.findIndex(obj => obj === channel.id)
        client.settings.delete(msg.guild.id, `imagechannel.${index}`)
        msg.channel.send('Removed ' + channel.name + ' from the list of image only channels.')
        return;
      }
   
   
 client.settings.push(msg.guild.id, channel.id, "imagechannel")
 msg.channel.send(`Set ${channel} to be image only.`)
   

}


  module.exports.help = {
    name:"imageonly",
    usage: 'Make a channel image only',
  }