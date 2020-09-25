const moment = require('moment')
const { MessageEmbed } = require('discord.js')
module.exports.run = async (client, msg, args) => {

    let user = msg.mentions.users.first() || msg.guild.members.cache.find(mem => mem.user.username === args[0]) || msg.guild.members.cache.find(mem => mem.user.tag === args[0]) || msg.guild.members.cache.get(args[0])

    if (!user) user = msg.author

    let joinPos = msg.guild.members.array().sort((a, b) => a.joinedAt - b.joinedAt)


    let embed = new MessageEmbed()
    .setAuthor(user.tag, user.displayAvatarURL())
    .setDescription(user)
    .addField(`Joined`, moment(msg.guild.member(user).joinedAt).format("llll"),true)
    .setThumbnail(user.displayAvatarURL())
    .addField("Join Position", joinPos.findIndex(obj => obj.user.id === user.id) === 0 ? 1 : joinPos.findIndex(obj => obj.user.id === user.id),true)
    .addField(`Registered`, moment(user.createdAt).format("llll"),true)
    .addField(`Roles [${msg.guild.member(user).roles.size}]`, msg.guild.member(user).roles.map(r => r.toLocaleString()).join(" "))
    .setTimestamp()
    .setFooter(user.id)
    .setColor("RANDOM")

    msg.channel.send(embed)
}

exports.help = {
    name:"whois",
    usage:"whois <user>"
}