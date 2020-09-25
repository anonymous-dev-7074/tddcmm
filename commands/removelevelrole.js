const { MessageEmbed } = require('discord.js')

exports.run = (client, msg, args) => {

    if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send('You do not have the required permission to use this command.').then(m => {
        setTimeout(() => {
            m.delete()
        }, 3000);
    })
    if (!args[0]) return msg.channel.send(`You forgot the role.`)

   
    let role = msg.guild.roles.cache.find(r => r.name === args.slice(0, args.length-1).join(" ")) || msg.guild.roles.cache.get(args.slice(0, args.length-1).join(" ")) || msg.mentions.roles.first()
   // if (msg.guild.roles.get(args[0])) role = msg.guild.roles.get(args[0])
   // if (msg.guild.roles.find(r => r.name === args[0])) role = msg.guild.roles.find(r => r.name === args[0])


    if (!role) return msg.channel.send('I could not find that role.')


    let array = client.settings.get(msg.guild.id, "roles")

    let data = array.findIndex(obj => obj.role === role.id)


    if (data < 0) return msg.channel.send('You did not have that role added as a levelrole.')


    client.settings.delete(msg.guild.id, `roles.${data}`)
    msg.channel.send(`Successfully removed ${msg.guild.roles.cache.get(role.id).toString()} from level ${array[data].level} 👍`)

}

module.exports.help = {
    name:"removelevelrole",
    usage:"!removelevelrole <role>"
  }