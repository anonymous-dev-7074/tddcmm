
let { MessageEmbed } = require('discord.js')
let { paginate } = require('discord.js-commando')
exports.run = (client, msg, args) => {

    let arr = client.settings.get(msg.guild.id, "messageroles")
    if (msg.channel.id !== client.settings.get(msg.guild.id, "roleschannel")) return;

    let role = msg.guild.roles.cache.find(r => r.name.toLowerCase() === args.join(" ").toLowerCase()) || msg.mentions.roles.first()
        if (!role) {
    	msg.delete()
       msg.reply('Could not find that role, try again.').then(m => setTimeout(() => {
        m.delete();
    }, 3000))   
       return;
    }
    if(msg.guild.member(msg.author).roles.has(role.id)) {
        msg.reply('took away the role.').then(m => setTimeout(() => {
            m.delete();
        }, 3000))   
        msg.guild.member(msg.author).roles.remove(role.id);
        return;
    }

    if (!arr.includes(role.id)) return msg.reply('Could not find that role, try again.').then(m => setTimeout(() => {
        m.delete();
    }, 3000))

    msg.reply(':thumbsup: gave you the role.').then(m => setTimeout(() => {
        m.delete();
    }, 3000))
    msg.guild.member(msg.author).roles.add(role.id)

    
}

module.exports.help = {
    name:"role",
    usage: "!role"
  }