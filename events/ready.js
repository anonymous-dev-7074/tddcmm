const { MessageEmbed } = require("discord.js")

module.exports = async(client) => {
client.user.setActivity(`+help | ${client.guilds.cache.size} guilds`, {type: "WATCHING"})
  client.blacklisted.ensure(client.user.id, {
    blacklistedusers: []
  });
console.log(`${client.user.tag} is online!`)



}
