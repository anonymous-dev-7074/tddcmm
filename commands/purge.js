exports.run = async (client, msg, args) => {

    if (!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.channel.send('You do not have the required permission to use this command.').then(m => {
        setTimeout(() => {
            m.delete()
        }, 3000);
    })
    if (msg.mentions.users.size > 0) {
        let amountToDelete = args[1]

        if (!args[1]) amountToDelete = 50;

        console.log(amountToDelete)
        if (parseInt(amountToDelete) > 100) return msg.reply('Invalid arguments, integer may not exceed `100`.')
        let userMessages = await msg.channel.messages.fetch({limit: parseInt(amountToDelete)})
        let userFilter = userMessages.filter(obj => obj.author.id === msg.mentions.users.first().id)

        msg.channel.bulkDelete(userFilter)
        msg.reply('done.').then(m => m.delete({timeout: 3000}))
        return;
    }
    
        if (args[0] === "bots") {
        let awaitBotMessages = await msg.channel.messages.fetch({limit: 100})
        let botFilter = awaitBotMessages.filter(obj => obj.author.bot)

        msg.channel.bulkDelete(botFilter)
        msg.reply('done.').then(m => m.delete({timeout: 5000}))

        return;
    }
    
        if (args[0] === "images") {
        let awaitImageMessages = await msg.channel.messages.fetch({limit: 100})
        let imageFilter = awaitImageMessages.filter(obj => obj.attachments.size > 0)
        
        msg.channel.bulkDelete(imageFilter)

        msg.reply('done.').then(m => m.delete({timeout: 5000}))
        return;
    }
    


    if (args[0] === "all") {
       let messages = 0;
       let i = true;
       while(i) {
       let deleteAble = await msg.channel.messages.fetch({limit: 100})
       if(deleteAble.size < 100) {
       	await msg.channel.bulkDelete(deleteAble)
       	 messages += deleteAble.size;
       	 i = false;
       	 msg.reply('Deleted ' + messages + ' messages.')
       	 messages = 0;
       	 return;
       }
       await msg.channel.bulkDelete(deleteAble)
       messages += deleteAble.size
       }
    } else if(typeof(parseInt(args[0])) == "number") {
        if (parseInt(args[0]) > 100) return msg.reply(`must be a valid integer below or exact 100, otherwise use !purge all.`)
        let messages = await msg.channel.messages.fetch({ limit: parseInt(args[0]) })
        msg.channel.bulkDelete(messages).then(m => {
            msg.reply('Deleted **' + m.size + '** messages.').then(m => setTimeout(() => {
                m.delete();
            }, 4000))
        })
    }

}

module.exports.help = {
    name:"purge",
    usage: "!purge all | !purge <amount> | !purge images | !purge bots | !purge @user"
  }