const { util } = require('discord.js-commando')
const { MessageEmbed } = require('discord.js')
exports.run = async (client, msg, args) => {
    if(!['yourid'].includes(msg.author.id)) return;

let page = args[0]
if (!page) return msg.reply('Please provide a page.')

       let servers = client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).map(g => g)
       let paginated = util.paginate(servers, page, 20)
       let embed = new MessageEmbed()
       .setDescription(paginated.items.map(g => `${g.name} - ${g.memberCount} (${g.id})`))
       
     
       msg.channel.send(embed)


}

exports.help = {
	name:"servers",
	usage: "servers <page>"
}
