
let { MessageEmbed } = require('discord.js')
exports.run = (client, msg, args) => {

    if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send('You do not have the required permission to use this command.').then(m => {
        setTimeout(() => {
            m.delete()
        }, 3000);
    })
    if (!args[0]) {
        return msg.channel.send('You forgot to specify the first integer.')
    }

    if (!args[1]) {
        return msg.channel.send('You forgot to specify the second integer.')
    }


    if (args[1] < 0) {
        return msg.channel.send('I can not use negative integers.')
    }
    if (args[0] < 0) {
        return msg.channel.send('I can not use negative integers.')
    }

    if (args[1] < args[0]) {
        return msg.channel.send('First integer can not be larger than the second one.')
    }

    if (args[1] > 1000) return msg.channel.send('Second integer can not be larger than 1000.')

    client.settings.set(msg.guild.id, [ { first: parseInt(args[0]), second: parseInt(args[1]) } ], "xpgain")
    msg.channel.send(`Successfully set the xp-gain to be in range of: ${args[0]}-${args[1]}.`)
}

module.exports.help = {
    name:"set-xpgain",
    usage:"!set-xpgain <first integer> <second integer>\nExample: !set-xpgain 0 30 (0-30)"
  }