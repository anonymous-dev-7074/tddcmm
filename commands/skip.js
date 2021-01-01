module.exports = {
help: {
name: "skip",
aliases: ["next"]
},	

run: async (client, message, args) => {
const msg = message;
        if (!msg.member.voice.channelID)
            return await msg.channel.send('Admiral, you are not in a voice channel to perform this');
        const dispatcher = client.queue.get(msg.guild.id);
        if (!dispatcher)
            return await msg.channel.send('Nothing is playing in this guild.');
        if (dispatcher.player.voiceConnection.voiceChannelID !== msg.member.voice.channelID)
            return await msg.channel.send('Teitoku, you are not in the same voice channel where I am.');
        await dispatcher.player.stopTrack();
}}
