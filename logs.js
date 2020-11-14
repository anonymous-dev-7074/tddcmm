const Discord = require('discord.js');
const client = new Discord.Client();
const { MessageEmbed } = require('discord.js')

client.once('ready', () => {
	console.log('logs Ready!');
});

client.on('messageDelete', message => {
let logschannel = db.get(`logschannel_${member.guild.id}`);


const logsembed = new MessageEmbed()
.setTitle("NEW LOG DETECTED")
.setDescription(`A message by ${message.author.tag} was deleted, but we don't know by who yet.`)
.setColor("#FF7034");
	client.channels.cache.get(logschannel).send(logsembed)
});

client.login("NzY4NTE3MjI2NjU0ODU5Mjk1.X5BncQ.iNJHaa-q8ry-n7GUm-jWRI0Qo-k");
