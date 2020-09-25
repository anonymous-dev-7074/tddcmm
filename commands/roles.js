
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
    let array = client.settings.get(msg.guild.id, "messageroles")
    if (array.length == 0) return msg.reply('You do not have any roles setup, use `!addpublicrole <role>`')
    const paginated = util.paginate(array, page, Math.floor(40))
    console.log(paginated)
    let embed = new MessageEmbed()
    .setAuthor(`Roles for ${msg.guild.name}.`, msg.guild.iconURL)
    .setColor("#FFC0CB")
    .setDescription(paginated.items.map(x => `${msg.guild.roles.cache.get(x).toString()}`))
    .setFooter("Use !role <rolename> to get it.")
        msg.channel.send(embed)

}

module.exports.help = {
    name:"roles",
    usage:"!roles <page>",
  }
