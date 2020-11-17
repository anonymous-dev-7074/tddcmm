
exports.run = (client, msg, args) => {

    if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send('You do not have the required permission to use this command.').then(m => {
        setTimeout(() => {
            m.delete()
        }, 3000);
    })
    let arr = client.settings.get(msg.guild.id, "messageroles");

    let role = msg.guild.roles.cache.find(r => r.name == args.join(" ")) || msg.mentions.roles.first() || msg.guild.roles.cache.get(args[0])
    if (!role) return msg.reply('Could not find that role!')
    if (arr.includes(role.id)) {
        msg.reply('That role was already added, removed it.')
        let index = arr.findIndex(obj => obj == role.id)
        client.settings.delete(msg.guild.id, `messageroles.${index}`)
        return;
    }
     
    client.settings.push(msg.guild.id, role.id, "messageroles")
    msg.reply(`:thumbsup: added ${msg.guild.roles.cache.get(role.id).toString()} to the public roles.`)
}

module.exports.help = {
    name:"addpublicrole",
    aliases: [],
    usage:"!addpublicrole <role>"
  }
