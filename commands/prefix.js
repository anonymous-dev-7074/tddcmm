exports.run = async (client, msg, args) => {
    if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send('You do not have the required permission to use this command.').then(m => {
        setTimeout(() => {
            m.delete()
        }, 3000);
    })
    if (!args[0]) return msg.reply('You forgot a prefix!')
    client.settings.set(msg.guild.id, args.join(" "), "prefix")
    msg.reply('Prefix has been changed to `' + args.join(" ") + '`')
}

exports.help = {
    name:"prefix",
    aliases : [] ,
    usage:"!prefix <prefix>"
}
