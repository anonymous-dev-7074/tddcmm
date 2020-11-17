
exports.run = (client, msg, args) => {

if (!msg.member.hasPermission("ADMINISTRATOR")) return msg.reply('You do not have the required permission to use this command.').then(m => m.delete({timeout: 5000}))
  let role = msg.guild.roles.cache.find(r => r.name.toLowerCase() === args.join(" ").toLowerCase()) || msg.guild.roles.cache.get(args[0]) || msg.mentions.roles.first()
  if(!role) return msg.reply('I could not find a role by the name of that.').then(m => m.delete({timeout: 5000}))

 let arr = client.settings.get(msg.guild.id, "doublexproles")
   
   let index = arr.findIndex(obj => obj === role.id)
   if (arr.includes(role.id)) {
    msg.reply('That role was already being rewarded with double XP, I removed it from being awarded with double xp.')
    client.settings.delete(msg.guild.id, `doublexproles.${index}`)
    return;
   }

   msg.channel.send(`${role.toString()} has been added to gaining double xp.`).then(m => m.delete({timeout: 10000}))
   client.settings.push(msg.guild.id, role.id, "doublexproles")

    
}

module.exports.help = {
    name:"add-doublexprole",
    aliases: []
    usage: "!add-doublexprole <role>"
  }
