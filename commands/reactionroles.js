
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
    let array = client.reactionroles.get(msg.guild.id, "roles")
  
    const paginated = util.paginate(array, page, Math.floor(10))
    console.log(paginated)
    let embed = new MessageEmbed()
    .setAuthor(`Reaction Roles for ${msg.guild.name}.`, msg.guild.iconURL)
    .setColor("RANDOM")
    .setDescription(paginated.items.map(x => x.roles.map(r => `${msg.guild.roles.cache.get(r.role)} -> ${r.emoji} (${x.messageid})`).join("\n")))
    .setFooter("To remove one, use !removereactionrole <id>. the ids are in parentheses.")
        msg.channel.send(embed)

}

module.exports.help = {
    name:"reactionroles",
    usage:"!reactionroles <page>",
  }
