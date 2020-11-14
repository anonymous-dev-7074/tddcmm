const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('messageDelete', message => {
let logschannel = db.get(`logschannel_${member.guild.id}`);
if (!logs) return;
	console.log(`A message by ${message.author.tag} was deleted, but we don't know by who yet.`);
});

client.login('your-token-goes-here');
