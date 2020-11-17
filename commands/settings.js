const { MessageEmbed } = require('discord.js')
exports.run = async (client, msg, args) => {

    let embed = new MessageEmbed()
    .setAuthor(`Settings for ${msg.guild.name} ??`, msg.guild.iconURL)
    .addField(`Public Role Channel`, client.channels.cache.get(client.settings.get(msg.guild.id, "roleschannel")) === undefined ? 'none' : client.channels.cache.get(client.settings.get(msg.guild.id, "roleschannel")))
    .addField(`Level UP Channel Messages`, client.channels.cache.get(client.settings.get(msg.guild.id, "channel")) === undefined ? 'none' : client.channels.cache.get(client.settings.get(msg.guild.id, "channel")))
    .addField(`No XP Channels`, client.settings.get(msg.guild.id, "noxpchannels").length === 0 ? "none" : client.settings.get(msg.guild.id, "noxpchannels").map(c => client.channels.cache.get(c)) || client.settings.get(msg.guild.id, "noxpchannels").length > 10 ? "Too many to be displayed." : client.settings.get(msg.guild.id, "noxpchannels").map(c => client.channels.cache.get(c)))
    .addField(`XP Gain`, `${client.settings.get(msg.guild.id, "xpgain")[0].first} - ${client.settings.get(msg.guild.id, "xpgain")[0].second}`)

    msg.channel.send(embed)

}

exports.help = {
    name:"settings",
    aliases : [] ,
    usage:"!settings"
}
