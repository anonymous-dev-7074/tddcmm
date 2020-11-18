module.exports = (client, guild) => {
client.settings.delete(guild.id)
client.user.setActivity(`+help | ${client.users.cache.size}`, {type: "WATCHING"})

}
