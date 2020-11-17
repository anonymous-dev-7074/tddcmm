module.exports = {
help: {
name: "loop",
aliases: []
},
run: async(client, message, args) => {
const bot = client;

            const player = bot.music.players.get(message.guild.id);
    if(!args[0]) return message.channel.send("Please specify to enable or disable loop")
    if(args[0] == 'queue' || args[0] == "queue"){
    if(player.queueRepeat == false){
    player.setQueueRepeat(true)
            message.channel.send('queue loop has been turned on')
    }
            else if(player.queueRepeat == true){
           player.setQueueRepeat(false)
                    message.channel.send('queue loop has been turned off')
            };
    
    
    };
     
            if(args[0] == 'track' || args[0] == "t"){    
    
      if(player.trackRepeat == true){
            player.setTrackRepeat(false)
              message.channel.send({embed: {description: "trackloop has been turned off"}})
    
      }
      else if(player.trackRepeat == false){
            player.setTrackRepeat(true)
                            message.channel.send({embed: {description: "trackbloop has been turned on!"}})
     }
                         
    
            }
}
}
