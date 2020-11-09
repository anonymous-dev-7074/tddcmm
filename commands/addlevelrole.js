
exports.run = (client, msg, args) => {

    if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send('You do not have the required permission to use this command.').then(m => {
        setTimeout(() => {
            m.delete()
        }, 3000);
    })
    if (!args[0]) return msg.channel.send(`You forgot the role.`)
    if (!args[args.length-1]) return msg.channel.send('You forgot to specify a level for the role to be given at.')

   
    let role = msg.guild.roles.cache.find(r => r.name === args.slice(0, args.length-1).join(" ")) || msg.guild.roles.cache.get(args.slice(0, args.length-1).join(" ")) || msg.mentions.roles.first()
   // if (msg.guild.roles.get(args[0])) role = msg.guild.roles.get(args[0])
   // if (msg.guild.roles.find(r => r.name === args[0])) role = msg.guild.roles.find(r => r.name === args[0])


    if (!role) return msg.channel.send('I could not find that role.')


    if (isNaN(args[args.length-1])) return msg.channel.send('Level argument has to be an `integer` (number)')

    let array = client.settings.get(msg.guild.id, "roles")

    let data = array.findIndex(obj => obj.level === parseInt(args[args.length-1]))
    let data2 = array.findIndex(obj => obj.role === msg.guild.roles.cache.get(role.id).name)


    if (data2 > -1) return msg.channel.send('You have already enabled a role with that name to be assigned.')
    if (data > -1) return msg.channel.send('You have already added that role to be assigned at a level.')


    client.settings.push(msg.guild.id, {level: parseInt(args[args.length-1]), role: role.id }, "roles")
    msg.channel.send(`Successfully added ${msg.guild.roles.cache.get(role.id).toString()} to level ${args[args.length-1]} 👍`)

}

module.exports.help = {
    name:"addlevelrole",
    usage:"!addlevelrole <role> <level>"
  }