const discord = require("discord.js")
const MessageEmbed = require("discord.js").MessageEmbed
const db = require("quick.db");
exports.run = (client, msg, args) => {
  if(!args[0]){
    const embed = new discord.MessageEmbed()
    .setColor("#00FF00")
    .setTitle("Level Stuff")
    .addField("Plugins", "`image`, `imageremove`")
    .setTimestamp()
    msg.channel.send(embed)
  }else if(args[0].toLowerCase() === "image"){
            const image = msg.attachments.first() ? msg.attachments.first().proxyURL : null || args[1];
    
            if(!image){
              const embed = new MessageEmbed()
              .setColor("RED")
              .setTitle("Link Error")
              .setDescription("Please Specify A Link To Be Seted In Level Up Background")
              .setTimestamp()
              msg.channel.send(embed)
            }else {
              msg.delete()
              const embed = new MessageEmbed()
              .setColor("BLUE")
              .setDescription("BackGround Seted As :")
              .setImage(image)
              .setTimestamp()
              msg.channel.send(embed)
              db.set(`lvlback_${msg.guild.id}`, image)
            }
  }
}
  module.exports.help = {
    name:"setlevel",
    usage: 'Lock a channel down.',
  }