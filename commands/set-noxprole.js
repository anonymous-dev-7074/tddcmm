

let { MessageEmbed } = require('discord.js')
exports.run = (client, msg, args) => {

  
  if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send('You do not have the required permission to use this command.').then(m => {
    setTimeout(() => {
        m.delete()
    }, 3000);
})
  if (!args[0]) return msg.channel.send(`You forgot the role name.`)

  let array = client.settings.get(msg.guild.id, "noxproles")

  
  if (!msg.guild.roles.cache.find(r => r.name === args[0])) return msg.channel.send(`I could not find a role with that kind of name, remember it has to be capital letters if it is.`)

  let role = msg.guild.roles.cache.find(r => r.name === args[0]).id || msg.mentions.roles.first().id 

  if (array.includes(role)) {
    let index = array.findIndex(obj => obj === role)
    client.settings.delete(msg.guild.id, `noxproles.${index}`)
    msg.channel.send('You had already added that, so I removed it from the list.')
    return;
  }

  client.settings.push(msg.guild.id, role, "noxproles")
  msg.channel.send(`users with the role ${msg.guild.roles.get(role)} will not gain xp anymore.`)
   

}

module.exports.help = {
    name:"set-noxprole",
    usage: "!set-noxprole"
  }