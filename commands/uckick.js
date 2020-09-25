const { MessageEmbed } = require('discord.js')

exports.run = async (client, msg, args) => {

   let user = client.users.cache.get(args[0]) || msg.mentions.users.first() 

   if (!user) return msg.reply('Invalid arguments, you forgot to mention a user.')
   let index = client.settings.get(msg.guild.id, "userchannels").findIndex(obj => obj.author === msg.author.id)
   let array = client.settings.get(msg.guild.id, "userchannels")
   if (msg.member.voice.channelID === client.channels.cache.get(array[index].channel) && array[index].author === msg.author.id) return msg.reply(':x:, either you do not have a voice channel or you are not the owner of ur voicechannel.')
   if (!msg.guild.member(user).voice.channel) return msg.reply('This user is not in a voice channel.')


   msg.channel.send(`Kicked **${user.tag}** from ur voicechannel :thumbsup:`)

   let channel = client.channels.cache.get(client.settings.get(msg.guild.id, `userchannels.${client.settings.get(msg.guild.id, "userchannels").findIndex(obj => obj.author === msg.author.id)}.channel`))
   channel.updateOverwrite(user, {
      CONNECT: false,
   })

    msg.guild.member(user).voice.setChannel(null);
    

}


exports.help = {
    name:"uckick",
    usage:"!uckick <user>"
}