module.exports = (client, guild) => {
client.settings.delete(guild.id)
client.user.setActivity(`+help | ${client.guilds.cache.size} guilds`, {type: "WATCHING"})

}
