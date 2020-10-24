
const { MessageEmbed } = require('discord.js')
const { util } = require('discord.js-commando')
exports.run = (client, msg, args) => {
    if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send('You do not have the required permission to use this command.').then(m => {
        setTimeout(() => {
            m.delete()
        }, 3000);
    })
    if (!args[0]) args[0] = 1

    let page = args[0]
    let thing = 1;
    let array = client.settings.get(msg.guild.id, "noxproles")
    const paginated = util.paginate(array, page, Math.floor(30))
    let embed = new MessageEmbed()
    .setAuthor(`No XP gaining Roles for ${msg.guild.name}.`, msg.guild.iconURL)
    .setColor("RANDOM")
    .setDescription(paginated.items.map(x => `${msg.guild.roles.cache.get(x).toString()}`))
        msg.channel.send(embed)

}

module.exports.help = {
    name:"noxproles",
    usage:"!noxproles <page>",
  }
