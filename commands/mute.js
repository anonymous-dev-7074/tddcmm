
const { MessageEmbed } = require('discord.js')
const ms = require("ms")
exports.run = async (client, msg, args) => {
 

  if (!msg.member.hasPermission("MUTE_MEMBERS")) {
  	return msg.reply('you do not have the required permissions to use this cmd.')
  }

 if (!msg.guild.roles.find(r => r.name === "Muted")) {
 	let mutedRole = await msg.guild.roles.create({
 		data: {
 			name:"Muted",
 			color:0x808080
 		}
 	})
     
    msg.guild.channels.filter(c => c.type === "text").forEach(c => {
    	c.overwritePermissions({
             permissionOverwrites: [
             {
                id: mutedRole.id,
                deny: ["SEND_MESSAGES"]
             }
             ]
    	})
    })

 }




    let member = msg.guild.members.cache.find(r => r.name === args[0]) || msg.guild.members.cache.get(args[0]) || msg.mentions.members.first()
    if (!member) return msg.reply('Invalid arguments, you forgot a member.')
    if (!args[1]) return msg.reply('you forgot to supply a valid time.')
    let time = args[1]
    let roletoremove = msg.guild.roles.cache.find(r => r.name === "Muted")

    if (ms(args[1]) === undefined) {
    	return msg.reply('That was not a valid time, please respond with a valid time.')
    }



    if (member.roles.has(roletoremove.id)) {
    	msg.reply('This user is already muted, please unmute them before.')
    }
   


    member.roles.add(roletoremove.id)

    msg.reply(`I muted ***${member.user.tag}*** for ${time}`)

    setTimeout(() => {
    	if (!member.roles.has(roletoremove.id)) {
    		return;
    	}
        member.roles.remove(roletoremove.id)
        member.user.send(`Your mute was lifted in ` + msg.guild.name + '.')
    }, ms(time))

}

  module.exports.help = {
    name:"mute",
    usage: '!mute <user> <duration>',
  }