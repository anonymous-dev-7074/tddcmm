module.exports = {
help: {
name: "pause",
aliases: ["resume"]
},
run: async(client, message, args) => {
        const bot = client;
    const player = bot.music.players.get(message.guild.id);

    if (!player) return message.channel.send("No song/s currently playing in this guild.");

    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel || voiceChannel.id !== player.voiceChannel.id) return message.channel.send("You need to be in a voice channel to pause music.");

    

    player.pause(player.playing);

    return message.channel.send(`Player is now ${player.playing ? "resumed" : "paused"}.`);
}
}
