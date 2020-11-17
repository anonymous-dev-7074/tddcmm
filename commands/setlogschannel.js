let { MessageEmbed } = require('discord.js')
const db = require("quick.db")
exports.run = (client, msg, args) => {
  
if (!msg.member.hasPermission("ADMINISTRATOR")) {
      const embed2 = new MessageEmbed()
        .setColor("RED")
        .setDescription(
          "**You Dont Have Permission To User This Command. Required Permission** `ADMINISTRATOR`"
        );
      return msg.channel.send(embed2);
    }
  let channel = msg.mentions.channels.first();
  if (!channel) {
        const emb = new MessageEmbed()
          .setColor("RED")
          .setTitle("<:Cross:744161251743105035> Channel Missing")
          .setDescription("Please Mention A Channel To Set As logs Channel!")
          .setTimestamp();
        return msg.channel.send(emb);} else {
  
db.set(`logschannel_${msg.guild.id}`, channel.id);
const emb = new MessageEmbed()
          .setColor("#00FF00")
          .setDescription(`Welcome Channel Seted As ${channel}`)
          .setTitle("<:yesk:744161409016922123> loge Channel Seted")
          .setTimestamp();
        msg.channel.send(emb);
        }
}
  
  
  
  
  module.exports.help = {
    name:"setlogschannel",
    aliases : [] ,
    usage: '+setlogschannel #channel',
  }
