
const { MessageEmbed } = require('discord.js')

exports.run = (client, msg, args) => {


if (!msg.member.hasPermission("ADMINISTRATOR")) {
  msg.reply('You do not have the required permission to use this.')
  return;
}


let user = msg.mentions.users.first() || client.users.get(args[0]) || msg.guild.members.find(mem => mem.user.username.toLowerCase() === args.join(" ").toLowerCase())


if (!user) return msg.reply('Invalid arguments, could not find the user.')




msg.reply('***' + user.tag + '*** has been softbanned, they may now join back.')
user.send('You have been softbanned from ' + msg.guild.name + ', you may now join back.')
setTimeout(() => {
msg.guild.member(user).ban()
}, 1000)
    
   



}


  module.exports.help = {
    name:"softban",
    aliases : [] ,
    usage: 'softban <user>',
  }
