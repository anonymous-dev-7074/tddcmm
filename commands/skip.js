module.exports = {
help: {
name: "skip",
aliases: ["next"]
},	

run: async (message, args) {
		const bot = this.client;
        const player = bot.music.players.get(message.guild.id);
        if(!player) return message.channel.send("No song/s currently playing in this guild.");

        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel || voiceChannel.id !== player.voiceChannel.id) return message.channel.send("You need to be in a voice channel to use the skip command.");

        player.stop();
        return message.channel.send("Successfully skipped the current song")
}}
