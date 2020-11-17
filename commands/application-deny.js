const { MessageEmbed } = require('discord.js')

exports.run = async (client, msg, args) => {

   if (!msg.member.hasPermission('MANAGE_ROLES')) return msg.channel.send('You do not have the required permission to use this command.').then(m => {
        setTimeout(() => {
            m.delete()
        }, 3000);
    })

    
    let userDeny = args[0]


    let arr = client.applications.get(msg.guild.id, "applications")
    let index = arr.findIndex(obj => obj.author === userDeny)
    if (arr.findIndex(obj => obj.author === userDeny) < 0) return msg.reply('I could not find an application by a user with that ID.')

    if(client.users.get(arr[index].author)) {
    	client.users.get(arr[index].author).send("Your application has been denied in " + msg.guild.name + '.')
    }

    msg.channel.send('Application has been denied.')
    client.applications.delete(msg.guild.id, `applications.${index}`)



}

module.exports.help = {
    name:"application-deny",
    aliases: [],
    usage:"!application-deny <userid>"
  }
