module.exports = {
help: {
name: "play"
},
run: async(client, message, args) => {
const msg = message;
  function checkURL(string) {
        try {
            new URL(string);
            return true;
        } catch (error) {
            return false;
        }
    };
        if (!message.member.voice.channelID)
            return await message.channel.send('Admiral, you are not in a voice channel');
        if (!args[0])
            return await message.channel.send('Admiral, you did not specify a link or search mode');
        const node = this.client.shoukaku.getNode();
        const query = args.join(' ');
let m = await message.channel.send(`:clock3: Loading ... (\`${query}\`)`)
        if (checkURL(query)) {
            const result = await node.rest.resolve(query);
            if (!result)
                return await m.edit('Admiral, I didn\'t find anything in the query you gave me');
            const { type, tracks, playlistName, length } = result;
            const track = tracks.shift();
track.info.thumbnail = track.info.uri.includes("youtube")
          ? `https://img.youtube.com/vi/${track.info.identifier}/maxresdefault.jpg`
          : null;
track.info.requester = msg.author;
            const isPlaylist = type === 'PLAYLIST';
            const res = await this.client.queue.handle(node, track, message);
            if (isPlaylist) {
                for (const track of tracks) await this.client.queue.handle(node, track, message);
            }   
            await m.edit(isPlaylist ? `🎶 **${playlistName}** Added to **Queue** (\`${this.client.formatDuration(length)}\`)!` : `🎶 **${track.info.title}** Added to **Queue** (\`${this.client.formatDuration(track.info.length)}\`)!`)
                .catch(() => m.edit("**❌ There was some error while adding the song!**"));
            if (res) await res.play();
            return;
        }
        const searchData = await node.rest.resolve(query, 'youtube');
        if (!searchData.tracks.length)
            return await m.edit('Admiral, I didn\'t find anything in the query you gave me');
        const track = searchData.tracks.shift();
track.info.thumbnail = track.info.uri.includes("youtube")
          ? `https://img.youtube.com/vi/${track.info.identifier}/maxresdefault.jpg`
          : null;
track.info.requester = msg.author;
        const res = await this.client.queue.handle(node, track, msg);
        await m.edit(`🎶 **${track.info.title}** Added to **Queue** (\`${this.client.formatDuration(track.info.length)}\`)!`).catch(() => m.edit("**❌ There was some error while adding the song!**"));
        if (res) await res.play();
}
}
