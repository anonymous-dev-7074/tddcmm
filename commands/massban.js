
exports.run = async (client, msg, args) => {

    if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send('You do not have the required permission to use this command.').then(m => {
        setTimeout(() => {
            m.delete()
        }, 3000);
    })

  

}

module.exports.help = {
    name:"massban",
    aliases: [],
    usage: "!massban <user>,<user>,<user>,<user> | !massban <userid>,<userid>,userid>,<userid>"
  }
