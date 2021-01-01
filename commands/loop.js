const sastaLoop = new Map()
module.exports = {
help: {
name: "loop",
aliases: []
},
run: async(client, message, args) => {
const queue = client.queue.get(message.guild.id);
if(!args[0]) {
const xd = sastaLoop.get(message.guild.id)
if(xd == null || xd == 0) {
sastaLoop.set(message.guild.id, 1)
queue.trackloop = true;
queue.queueloop = false;
message.channel.send({embed: {color: 'black', description: 'Now looping the **current track**'}})
}
else if (xd == 1) {
sastaLoop.set(message.guild.id, 2)
queue.trackloop = false;
queue.queueloop = true;
message.channel.send({embed: {color: 'black', description: 'Now looping the **queue**'}})
}    
else if(xd == 2) {
sastaLoop.set(message.guild.id, 0)
queue.trackloop = false;
queue.queueloop = false;
message.channel.send({embed: {color: 'black', description: 'Looping has been **disabled**'}})
}
}
else if(args[0]) {
if(args[0] == 'song' || args[0] == 'track'){
queue.trackloop = true;
queue.queueloop = false;
message.channel.send({embed: {color: 'black', description: 'Now looping the **current track**'}})
}
else if(args[0] == 'queue') {
queue.trackloop = false;
queue.queueloop = true;
message.channel.send({embed: {color: 'black', description: 'Now looping the **queue**'}})
}
else if(args[0] == 'disable' || args[0] == 'off'){
queue.trackloop = false;
queue.queueloop = false;
message.channel.send({embed: {color: 'black', description: 'Looping has been **disabled**'}})
}
}
}
}
