const { MessageEmbed } = require('discord.js')
exports.run = async (client, msg, args) => {

let user = msg.mentions.users.first() || client.users.cache.get(args[0])
  if (!user) user = msg.author




  let embed = new MessageEmbed()
  .setAuthor(`${user.tag}`, user.displayAvatarURL({size: 2048}))
  .setImage(user.displayAvatarURL({dynamic: true}))
  .setColor("RANDOM")
  msg.channel.send(embed)

}

exports.help = {
	name:"av",
	usage: "av <user>"
}