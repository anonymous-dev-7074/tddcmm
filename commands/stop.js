module.exports = {
help: {
name: "stop"
},
run: async(client, message, args) => {
        const bot = client;
        const voiceChannel = message.member.voice.channel;

        const player = bot.music.players.get(message.guild.id);

        if(!player) return message.channel.send("No song/s currently playing in this guild.");

        if(!voiceChannel || voiceChannel.id !== player.voiceChannel.id) return message.channel.send("You need to be in a voice channel to use the leave command.");

        bot.music.players.destroy(message.guild.id);

        return message.channel.send("Successfully stopped the music.")
  
}
}
