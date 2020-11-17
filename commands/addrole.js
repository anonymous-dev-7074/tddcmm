const { MessageEmbed } = require('discord.js')
exports.run = async (client, msg, args) => {
    if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send('You do not have the required permission to use this command.').then(m => {
        setTimeout(() => {
            m.delete()
        }, 3000);
    })

    let user = msg.guild.members.cache.find(mem => mem.user.username === args[0]) || msg.guild.members.cache.get(args[0]) || msg.mentions.users.first()
    let role = msg.guild.roles.cache.find(r => r.name === args.slice(1, args.length).join(" ")) || msg.guild.roles.cache    .get(args.slice(1, args.length).join(" ")) || msg.mentions.roles.first()
        if (role && user) {
        if (msg.guild.member(user).roles.has(role.id)) {
            msg.channel.send(`-${role.toString()} from ***${user.tag === undefined ? user.user.tag : user.tag}***`)
            msg.guild.member(user).roles.remove(role.id)
            return;
        }
        msg.guild.member(user).roles.add(role.id)
        msg.channel.send(`+${role.toString()} to ***${user.tag === undefined ? user.user.tag : user.tag}***`)
        return;
    }


    if (!role && user) {
        msg.guild.roles.create({data: {
        name: args.join(" ").slice(args[0].length)}}).then(async r => {
           let m = await msg.reply(`created role ${r.toString()}.`)
           setTimeout(() => {
                 m.edit(`+${r.toString()} to ***${user.tag === undefined ? user.user.tag : user.tag}***`)
                 msg.guild.member(user).roles.add(r)
                        }, 2000);
        })
        return;
    }




   }
   
   module.exports.help = {
    name:"addrole",
    aliases: []
    usage:"!addrole <user> <role> || !addrole <role>"
  }
