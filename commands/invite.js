exports.run = async (client, msg, args) => {

let { MessageEmbed } = require('discord.js')

msg.channel.send(`https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8`)


}

exports.help = {
	name:"invite",
	usage:"!invite"
}