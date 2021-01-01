const {MessageEmbed} = require("discord.js");
class AudioDispatcher {
    constructor(options) {

        this.client = options.client;
        this.guild = options.guild;
        this.text = options.text;
        this.player = options.player;
        this.queue = [];
        this.trackloop = false;
        this.queueloop = false;
        this.current = null;
        this.previous = null;


        this.player.on('start', () =>{
let duration = ms(this.current.info.length, {long: false})
const embed = new MessageEmbed()
.setTitle('Now Playing:')
.setDescription(`[${this.current.info.title}](${this.current.info.uri})`)
this.text.send(embed)
//this.text.send(`Now Playing: **${this.current.info.title}**`)

})
        
        this.player.on('end', () => {
this.previous = this.current;
this.current = null;
if(this.trackloop) {
this.queue.push(this.previous)
array_move(this.queue, -1);
}
else if(this.queueloop) this.queue.push(this.previous);
            this.play()
                .catch(error => {
                    this.queue.length = 0;
                    this.destroy();
                });
        });
        for (const playerEvent of ['closed', 'error', 'nodeDisconnect']) {
            this.player.on(playerEvent, data => {
                if (data instanceof Error || data instanceof Object) this.client.logger.error(data);
                this.queue.length = 0;
                this.destroy();
            });
        }
    }

    get exists() {
        return this.client.queue.has(this.guild.id);
    }

    async play() {
        if (!this.exists || !this.queue.length) return this.destroy();
        this.current = this.queue.shift();
        await this.player.playTrack(this.current.track);
    }

    destroy(reason) {
this.trackloop = false;
this.queueloop = false;
        this.queue.length = 0;
        this.player.disconnect();
        this.client.queue.delete(this.guild.id);
        this.text.send({embed: {description: '<:9192_random_tick:777220713442443285> Queue has ended.', color: 'black'}}).catch(() => null);
    }
}

function array_move(arr, old_index, new_index) {
    while (old_index < 0) {
        old_index += arr.length;
    }
    while (new_index < 0) {
        new_index += arr.length;
    }
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
};

module.exports = AudioDispatcher;
