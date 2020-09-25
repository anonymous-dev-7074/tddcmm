const { MessageEmbed } = require('discord.js')


exports.run = async (client, msg, args) => {

    if (!msg.member.permissions.has("ADMINISTRATOR")) {
        return msg.reply('You do not have the required permissions to use that command!')
    }
    let createParent = await msg.guild.channels.create("User Channels", { type: "category" } )
    msg.guild.channels.create("Join To Create", { type:"voice"} ).then(c => {
       c.setParent(createParent.id, { lockPermissions: false })
       client.settings.set(msg.guild.id, { channel: c.id, category: createParent.id }, "userchannelcreate")
       msg.channel.send(`Successfully setup the channel, to get ur own channel please join the channel called "Join To Create", you can rename this channel if you would like.`)
    })

    
}


exports.help = {
    name:"userchannels-setup",
    usage:"!userchannels-setup"
}