module.exports = {
help: {
name: "play"
},
run: async(client, message, args) => {
    const voiceChannel = message.member.voice.channel;
const client = this.client;
        const player = client.music.players.spawn({
            guild: message.guild,
            voiceChannel: voiceChannel,
            textChannel: message.channel,
          selfDeaf: true
        });

        const res = await client.music.search(args.join(" "), message.author);

        player.queue.add(res.tracks[0]);
        if (!player.playing) player.play();

}
}
