

exports.run = async (client, msg, args) => {

if (msg.author.id !== "yourid") return;

let user = msg.mentions.users.first() || msg.guild.members.cache.get(args[0]) || msg.guild.members.cache.find(mem => mem.user.username === args.join(" "))
if (!user) return msg.reply('Invalid arguments, can not find that user.')
if (client.blacklisted.get(client.user.id, "blacklistedusers").includes(user.id)) {
	msg.reply('Unblacklisted the user.')
	client.blacklisted.delete(client.user.id, `blacklistedusers.${client.blacklisted.get(client.user.id, "blacklistedusers").findIndex(obj => obj === user.id)}`)
	return;
}


client.blacklisted.push(client.user.id, user.id, "blacklistedusers")
msg.reply(':thumbsup: blacklisted the user.')

}

exports.help = {
	name:"blacklist",
        aliases: [],
	usage: "!blacklist <user>",
	group: "developer"
}
