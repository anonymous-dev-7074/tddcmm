const AudioDispatcher = require('./AudioDispatcher.js');

class Queue extends Map {
    constructor(client, iterable) {
        super(iterable);
        this.client = client;
    }

    async handle(node, track, msg) {
        const existing = this.get(msg.guild.id);
        if (!existing) {
            const player = await node.joinVoiceChannel({
                guildID: msg.guild.id,
                voiceChannelID: msg.member.voice.channelID,
deaf: true
            });
    if(msg.guild.me.voice.serverMute === false) {
      msg.guild.me.voice.setDeaf(true)
    }
            const dispatcher = new AudioDispatcher({
                client: this.client,
                guild: msg.guild,
                text: msg.channel,
                player
            });
            dispatcher.queue.push(track);
            this.set(msg.guild.id, dispatcher);
            return dispatcher;
        }
        existing.queue.push(track);
        return null;
    }
}
module.exports = Queue;
