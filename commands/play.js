module.exports = {
help: {
name: "play"
},
run: async(client, message, args) => {
    const voiceChannel = message.member.voice.channel;
        const player = client.music.players.spawn({
            guild: message.guild,
            voiceChannel: voiceChannel,
            textChannel: message.channel,
          selfDeaf: true
        });

        const res = await client.music.search(args.join(" "), message.author);

        player.queue.add(res.tracks[0]);
if(player.playing) message.channel.send(res.tracks[0].title+" has been added to the queue.")
        if (!player.playing) player.play();

}
}
