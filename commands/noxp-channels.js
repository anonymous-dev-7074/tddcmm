let { MessageEmbed } = require("discord.js");
const discord = require("discord.js");
exports.run = (client, msg, args) => {
  if (!msg.member.hasPermission("ADMINISTRATOR"))
    return msg.channel
      .send("You do not have the required permission to use this command.")
      .then(m => {
        setTimeout(() => {
          m.delete();
        }, 3000);
      });

  let channel =
    msg.guild.channels.cache.find(c => c.name === args[0]) ||
    msg.mentions.channels.first();

  //let channels = client.settings.get(msg.guild.id, channel.id, "noxpchannels");

  let embed = new discord.MessageEmbed()
    .setTitle("THESE ARE THE CHANNELS WHICH WERE SETTED FOR NO XP GAIN")
    .setDescription(
      client.settings.get(msg.guild.id, msg.channel.id, "noxpchannels")
    )

    .setColor("#000000");

  msg.channel.send(embed);
};

module.exports.help = {
  name: "noxpchannels",
  usage: "!set-noxpchannel <channel> | !set-noxpchannel #channel"
};
