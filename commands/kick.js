
const { MessageEmbed } = require('discord.js')

exports.run = async (client, msg, args) => {
    if (!msg.member.hasPermission('KICK_MEMBERS')) return msg.channel.send('You do not have the required permission to use this command.').then(m => {
        setTimeout(() => {
            m.delete()
        }, 3000);
    })

    if (!args[0]) return msg.reply('Invalid arguments, I could not find that user.')

 
    let user = msg.guild.members.cache.find(mem => mem.user.username.toLowerCase().startsWith(args[0].toLowerCase())) || msg.mentions.users.first() || msg.guild.members.cache.get(args[0])
    if(!user) {
        msg.reply('Invalid arguments, I could not find that user.')
        return;
      }

    if (user) {
      if(!msg.guild.member(user).kickable) return msg.reply('This user has a higher role than me or is an `ADMINISTRATOR`.')
    msg.reply('Kicked user ***' + client.users.cache.get(user.id).tag + '***.')
     msg.guild.member(user).kick()
     return;
    }




}

  module.exports.help = {
    name:"kick",
    usage: '!kick <user || userid || username>',
  }