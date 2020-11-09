const discord = require("discord.js")
const MessageEmbed = require("discord.js").MessageEmbed
const db = require("quick.db");
module.exports = {
  
 run : async (client, msg, args) => {
  if(!args[0]){
    const embed = new discord.MessageEmbed()
    .setColor("#00FF00")
    .setTitle("Level Stuff")
    .addField("Plugins", "`image`, `imageremove`")
    .setTimestamp()
    msg.channel.send(embed)
  }else if(args[0].toLowerCase() === "image"){
            const image = args[1]
    
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
  }else if (args[0].toLowerCase() === "imageremove"){
  
    const kk = new MessageEmbed()
    .setColor("YELLOW")
    .setTiTle("SUCCESFULL")
    .setDescription("LEVEL IMAGE WAS SUCCESFULLY REMOVED GG")
    msg.channel.send(kk)
    db.delete(`lvlback_${msg.guilf.id}
  }
}}
  module.exports.help = {
    name:"setlevel",
    usage: 'Lock a channel down.',
  }