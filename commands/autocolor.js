
	 const roles = require('../color-roles.json')[0].roles
const { MessageEmbed } = require('discord.js')
module.exports.run = async (client, msg, args) => {

if(!msg.member.permissions.has("ADMINISTRATOR")) return msg.reply('u dont have perms for this.')
    let channel = msg.mentions.channels.first() || msg.guild.channels.cache.get(args[0]) || msg.guild.channels.cache.find(c => c.name === args[0])

    if (!channel) return msg.reply('Invalid arguments, I could not find that channel.')

    msg.channel.send('Now setting up colors in' + channel + ', this may take some time.')
    await channel.send(new MessageEmbed().setImage("https://media.giphy.com/media/WAuU81QWgqIww/giphy.gif").setColor("BLACK"))

    let firstEmbed = new MessageEmbed()
    .setAuthor(`Black & White`, msg.guild.iconURL)
    .setDescription(`White -> ☁️\nSilver -> ⛓️\nGray -> ❕\nBlack -> ⚫`)
    .setColor("BLACK")

    let firstMessage = await channel.send(firstEmbed)
    await firstMessage.react("☁️")
    await firstMessage.react("⛓️")
    await firstMessage.react("❕")
    await firstMessage.react("⚫")

    await channel.send(new MessageEmbed().setImage("https://i.pinimg.com/originals/4c/96/0a/4c960a37f06c4b3cef89bb6318cba1f5.gif").setColor("RED"))
    let secondEmbed = new MessageEmbed()
    .setAuthor(`Red`, msg.guild.iconURL)
    .setDescription(`Red -> 🍅\nLight red -> 🥭\nSalmon -> 🍂\nScarlet -> 🐦`)
    .setColor("RED")

    let secondMessage = await channel.send(secondEmbed)

    await secondMessage.react("🍅")
    await secondMessage.react("🥭")
    await secondMessage.react("🍂")
    await secondMessage.react("🐦")


    await channel.send(new MessageEmbed().setImage("https://media1.tenor.com/images/b6ae575060f3249d28ce3eab76909ef8/tenor.gif").setColor("YELLOW"))
    let ThirdEmbed = new MessageEmbed()
    .setAuthor(`Yellow`, msg.guild.iconURL)
    .setDescription(`Yellow -> 🐤\nCream -> 🌕\nMellow Yellow -> 🐅\nGoldenrod -> 🍊`)
    .setColor("YELLOW")

    let ThirdMessage = await channel.send(ThirdEmbed)
    
    await ThirdMessage.react("🐤")
    await ThirdMessage.react("🌕")
    await ThirdMessage.react("🐅")
    await ThirdMessage.react("🍊")

    await channel.send(new MessageEmbed().setImage("https://media0.giphy.com/media/67oWKfDkwuFpByHv3j/giphy.gif").setColor("GREEN"))


    let FourthEmbed = new MessageEmbed()
    .setAuthor("Green", msg.guild.iconURL)
    .setDescription(`Green -> 🍏\nLime -> 🍐\nAvocado -> 🥑\nSpring -> 🥒`)
    .setColor("GREEN")

    let FourthMessage = await channel.send(FourthEmbed)

    await FourthMessage.react("🍏")
    await FourthMessage.react("🍐")
    await FourthMessage.react("🥑")
    await FourthMessage.react("🥒")
    await channel.send(new MessageEmbed().setImage("https://data.whicdn.com/images/296384670/original.gif").setColor("#ffc0cb"))


    let FifthEmbed = new MessageEmbed()
    .setAuthor("Pink", msg.guild.iconURL)
    .setDescription(`Pink -> 🧠\nMagenta -> 🍁\nCreamy -> 🐷\nPunch -> 🌸`)
    .setColor("#ffc0cb")

    let FifthMessage = await channel.send(FifthEmbed)

    
    await FifthMessage.react("🧠")
    await FifthMessage.react("🍁")
    await FifthMessage.react("🐷")
    await FifthMessage.react("🌸")

    await channel.send(new MessageEmbed().setImage("https://steamuserimages-a.akamaihd.net/ugc/913549945313014596/B754DF5C0E41164846EEE9961094686CDA916C68/").setColor("BLUE"))
    let SixthEmbed = new MessageEmbed()
    .setAuthor("Blue", msg.guild.iconURL)
    .setColor("#0000ff")
    .setDescription(`Blue -> 🔵\nLight Blue -> 👗\nAqua -> ☄️\nCyan -> 💙`)

    let SixthMessage = await channel.send(SixthEmbed)
    await SixthMessage.react("🔵")
    await SixthMessage.react("👗")
    await SixthMessage.react("☄️")
    await SixthMessage.react("💙")



    
for(let i = 0; i < roles.length; i++) {

        await msg.guild.roles.create({ data: {

            name: roles[i].name,
            color: roles[i].hex,
            }
        })

}
    

    client.reactionroles.push(msg.guild.id, { messageid: firstMessage.id, roles: [] }, "roles")
    client.reactionroles.push(msg.guild.id, { messageid: secondMessage.id, roles: [] }, "roles")
    client.reactionroles.push(msg.guild.id, { messageid: ThirdMessage.id, roles: [] }, "roles")
    client.reactionroles.push(msg.guild.id, { messageid: FourthMessage.id, roles: [] }, "roles")
    client.reactionroles.push(msg.guild.id, { messageid: FifthMessage.id, roles: [] }, "roles")
    client.reactionroles.push(msg.guild.id, { messageid: SixthMessage.id, roles: [] }, "roles")


for(let i = 0; i < roles.length; i++) {

let r = roles   
console.log(roles[i])
    if (r[i].name === "white" || r[i].name === "black" || r[i].name === "gray" || r[i].name === "silver") {
       client.reactionroles.push(msg.guild.id, { role: msg.guild.roles.find(role => role.name === r[i].name).id , emoji: r[i].emoji }, `roles.${client.reactionroles.get(msg.guild.id, "roles").findIndex(obj => obj.messageid === firstMessage.id)}.roles`)
    }

    if (r[i].name === "yellow" || r[i].name === "cream" || r[i].name === "mellow yellow" || r[i].name === "goldenrod") {
        client.reactionroles.push(msg.guild.id, { role: msg.guild.roles.find(role => role.name === r[i].name).id , emoji: r[i].emoji }, `roles.${client.reactionroles.get(msg.guild.id, "roles").findIndex(obj => obj.messageid === ThirdMessage.id)}.roles`)
    }
    if (r[i].name === "red" || r[i].name === "light red" || r[i].name === "salmon" || r[i].name === "scarlet") {
        client.reactionroles.push(msg.guild.id, { role: msg.guild.roles.find(role => role.name === r[i].name).id , emoji: r[i].emoji  }, `roles.${client.reactionroles.get(msg.guild.id, "roles").findIndex(obj => obj.messageid === secondMessage.id)}.roles`)

    }
    if (r[i].name === "green" || r[i].name === "lime" || r[i].name === "avocado" || r[i].name === "spring") {
        client.reactionroles.push(msg.guild.id, { role: msg.guild.roles.find(role => role.name === r[i].name).id , emoji: r[i].emoji }, `roles.${client.reactionroles.get(msg.guild.id, "roles").findIndex(obj => obj.messageid === FourthMessage.id)}.roles`)
    }

    if (r[i].name === "magenta" || r[i].name === "pink" || r.name === "creamy" || r[i].name === "punch") {
        client.reactionroles.push(msg.guild.id, { role: msg.guild.roles.find(role => role.name === r[i].name).id , emoji: r[i].emoji}, `roles.${client.reactionroles.get(msg.guild.id, "roles").findIndex(obj => obj.messageid === FifthMessage.id)}.roles`)
    }


    if(r[i].name === "blue" || r[i].name === "lightblue" || r[i].name === "aqua" || r[i].name === "cyan") {
    	        client.reactionroles.push(msg.guild.id, { role: msg.guild.roles.find(role => role.name === r[i].name).id , emoji: r[i].emoji }, `roles.${client.reactionroles.get(msg.guild.id, "roles").findIndex(obj => obj.messageid === SixthMessage.id)}.roles`)
    }

}
    msg.channel.send('Successfully set up the reactionroles & colors.')
}


exports.help = {
	name:"autocolor",
        aliases: []
	usage:"!autocolor #channel"
}
