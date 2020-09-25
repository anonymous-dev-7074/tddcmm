
let { MessageEmbed } = require('discord.js')
exports.run = (client, msg, args) => {

    if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send('You do not have the required permission to use this command.').then(m => {
        setTimeout(() => {
            m.delete()
        }, 3000);
    })

 
    let user = msg.guild.members.cache.find(mem => mem.user.username === args[0]) || msg.guild.members.cache.get(args[0]) || msg.mentions.users.first()
    client.profile.delete(`${msg.guild.id}-${msg.author.id}`)
    msg.channel.send(`I've successfully reset ${user.tag}.`);


}

module.exports.help = {
    name:"reset",
    usage: "!reset <user>"
  }