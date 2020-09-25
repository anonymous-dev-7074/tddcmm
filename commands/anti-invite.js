
const { MessageEmbed } = require('discord.js')

exports.run = (client, msg, args) => {

    if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send('You do not have the required permission to use this command.').then(m => {
        setTimeout(() => {
            m.delete()
        }, 3000);
    })

    if(client.settings.get(msg.guild.id, "antiinvite")) {
        client.settings.set(msg.guild.id, false, "antiinvite")
        msg.reply('Disabled anti-invite.')
        return;
    } else if(!client.settings.get(msg.guild.id, "antiinvite")) {
        client.settings.set(msg.guild.id, true, "antiinvite")
        msg.reply('Enabled anti-invite.')
        return;
    }

    
}


  module.exports.help = {
    name:"anti-invite",
    usage:'Disable users from sending invites in your server.',
  }