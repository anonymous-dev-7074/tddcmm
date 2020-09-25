const { MessageEmbed } = require('discord.js')

exports.run = async (client, msg, args) => {

    if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send('You do not have the required permission to use this command.').then(m => {
        setTimeout(() => {
            m.delete()
        }, 3000);
    })



    	if (client.applications.get(msg.guild.id, "application").length > 0) {
    		msg.reply('reset the application, you will proceed to set it up again.').then(m => m.delete({timeout: 3000}))
    		client.applications.set(msg.guild.id, [], "application")
            client.applications.set(msg.guild.id, "none", "message")
    	}
  

    msg.reply('please respond with how many questions you would like to have in ur application format.') 

    let amountQuestions = await msg.channel.awaitMessages(res => res.author.id === msg.author.id, {
    	max: 1,
    	time: 30000,
    })

    if (isNaN(amountQuestions.first().content)) {
    	return msg.reply('Invalid arguments, amount of questions has to be an integer.')
    }


    let number = parseInt(amountQuestions.first().content);

    msg.channel.send(`You will now be prompted to send the questions.`).then(m => m.delete({timeout: 10000}))
    let i = 1;
    while(number >= i) {
     
     let m = await msg.channel.send(`Now please respond with the ${i} question.`)

     let question = await msg.channel.awaitMessages(res => res.author.id === msg.author.id, {
     	max: 1,
     	time: 30000,
     })

     if (question.first().content.length > 2000) return msg.reply('Questions may not exceed 2000 characters.')
     question.first().delete();
     m.delete();

     client.applications.push(msg.guild.id, { question: question.first().content }, "application")
     i++
    }


    let embed = new MessageEmbed()
    .setDescription(`React to this message to start your application!`)
    .setColor("RANDOM")

    msg.channel.send(embed).then(m => {
        m.react("✉️")
        client.applications.set(msg.guild.id, m.id, "message")
    })

    


}

module.exports.help = {
    name:"application-setup",
    usage:"!application-setup"
  }