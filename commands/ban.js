

exports.run = async (client, msg, args) => {
    if (!msg.member.hasPermission('BAN_MEMBERS')) return msg.channel.send('You do not have the required permission to use this command.').then(m => {
        setTimeout(() => {
            m.delete()
        }, 3000);
    })

    if(!args[0]) return msg.reply('You forgot a user.')
    let user = msg.guild.members.cache.find(mem => mem.user.username.toLowerCase().startsWith(args[0].toLowerCase())) || msg.mentions.users.first() || client.users.cache.get(args[0])
    if(!user) {
      msg.reply('Invalid arguments, I could not find that user.')
      return;
    }
    if(msg.guild.member(user).hasPermission("ADMINISTRATOR")) {
         return msg.reply('that user is an admin i can not ban them.')
    }
    if (user) {
      if(!msg.guild.member(user).bannable) return msg.reply('This user has a higher role than me or is an `ADMINISTRATOR`.')
    msg.reply('Banned user ***' + client.users.cache.get(user.id).tag + '***.')
     msg.guild.member(user).ban()
     return;
    }




}

  module.exports.help = {
    name:"ban", 
    aliases: [],
    usage: '!ban <user || userid || username>',
  }
