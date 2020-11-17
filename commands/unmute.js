
const { MessageEmbed } = require('discord.js')
exports.run = async (client, msg, args) => {
 

  if (!msg.member.hasPermission("MUTE_MEMBERS")) {
    return msg.reply('you do not have the required permissions to use this cmd.')
  }

    let member = msg.guild.members.cache.find(r => r.name === args[0]) || msg.guild.members.cache.get(args[0]) || msg.mentions.members.first()

    let role = msg.guild.roles.cache.find(r => r.name === "Muted")
    if (!role) return msg.reply('There was not even a role by the name of muted.. try muting somebody before.')

    if (!member) return msg.reply('Invalid arguments, could not find that user.')


    if(!member.roles.has(role.id)) return msg.reply('the user you specified was not muted.')
        member.roles.remove(role.id)
    msg.reply('unmuted ***' + member.user.tag + '***.')



}

  module.exports.help = {
    name:"unmute",
    aliases : [] ,
    usage: '!unmute <user> (they must have the muted role)',
  }
