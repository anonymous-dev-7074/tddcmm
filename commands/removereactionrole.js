const { MessageEmbed } = require('discord.js')
exports.run = async (client, msg, args) => {
      if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send('You do not have the required permission to use this command.').then(m => {
        setTimeout(() => {
            m.delete()
        }, 3000);
    })

if (args[0] === "all") {
	client.reactionroles.set(msg.guild.id, [], "roles")
	msg.reply('Successfully removed all reaction roles.')
	return;
}

    let array = client.reactionroles.get(msg.guild.id, "roles")
 
   

    let role = msg.guild.roles.cache.get(args[1]) || msg.guild.roles.cache.find(r => r.name === args.join(" ").slice(args[0].length + 1)) || msg.mentions.roles.first()
  
    if (!role) return msg.reply('I could not find that role in ur server.')

    let index = array.findIndex(obj => obj.messageid === args[0])
    if (index < 0) return msg.channel.send('I do not have a logged reaction role related to that message, try another one.')

    if (array[index].roles.length == 1) {
         client.reactionroles.delete(msg.guild.id, `roles.${index}`)
         msg.reply(`Success, you will have to delete the message or reaction by yourself.`)
         return;
    }

    let index2 = array[index].roles.findIndex(obj => obj.role === role.id)
    if (index2 < 0) return msg.channel.send('I do not have a reaction role related to that role, try another one.')

    client.reactionroles.delete(msg.guild.id, `roles.${index}.roles.${index2}`)
    msg.reply('Success, you will have to delete the message or reaction yourself.')
      
   
   }
   
   module.exports.help = {
    name:"removereactionrole",
    usage:"!removereactionrole <messageID> <role>"
  }