const Discord = require('discord.js'),
    DisTube = require('distube'),
    client = new Discord.Client(),
    config = {
        prefix: "+"
        
    };
const { MessageEmbed } = require("discord.js")
 
require("./faith.js")
// Create a new DisTube
const distube = new DisTube(client, { searchSongs: false, emitNewSongOnly: true, leaveOnFinish: true,highWaterMark: 1 << 25 });
 
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
 
client.on("message", async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift();
 if (command == "autoplay") {
        let mode = distube.toggleAutoplay(message);
        message.channel.send("Set autoplay mode to `" + (mode ? "On" : "Off") + "`");
}
    if (command == "play")
        distube.play(message, args.join(" "));

if (command == "skip")
        distube.skip(message);
if (command == "volume")
        distube.setVolume(message, args[0]);
 
    if (["repeat", "loop"].includes(command))
        distube.setRepeatMode(message, parseInt(args[0]));
 
    if (command == "stop") {
        distube.stop(message);
        message.channel.send("Stopped the music!");
    }
 
    if (command == "queue") {
        let queue = distube.getQueue(message);
        message.channel.send('Current queue:\n' + queue.songs.map((song, id) =>
            `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
        ).join("\n"));
    }
 
    if ([`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`].includes(command)) {
        let filter = distube.setFilter(message, command);
        message.channel.send("Current queue filter: " + (filter || "Off"));
    }
});
 
// Queue status template
const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;
 
// DisTube event listeners, more in the documentation page
distube
    .on("playSong", (message, queue, song) => message.channel.send(new MessageEmbed()
        .setDescription(`Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${status(queue)}`)
        .setImage(`${song.thumbnail}`)
.setColor("#00FFFF")
    ))

    .on("addSong", (message, queue, song) => message.channel.send(new MessageEmbed()
        .setDescription(`Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`)
.setColor("#00FFFF")
    ))
    .on("playList", (message, queue, playlist, song) => message.channel.send(new MessageEmbed()
       .setDescription(`Play \`${playlist.title}\` playlist (${playlist.total_items} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`)
.setImage(`${song.thumbnail}`)
.setColor("#00FFFF")
    ))
    .on("addList", (message, queue, playlist) => message.channel.send(new MessageEmbed()
        .setDescription(`Added \`${playlist.title}\` playlist (${playlist.total_items} songs) to queue\n${status(queue)}✅`)
.setColor("#00FFFF")
    ))
    // DisTubeOptions.searchSongs = true
    .on("searchResult", (message, result) => {
        let i = 0;
        message.channel.send(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`);
    })


 .on("initQueue", queue => {
 queue.autoplay = false;
  })
 
    // DisTubeOptions.searchSongs = true
    .on("searchCancel", (message) => message.channel.send(`Searching canceled`))
    .on("error", (message, err) => message.channel.send(
        "An error encountered: " + err
    ));
 
client.login("NzY4NTE3MjI2NjU0ODU5Mjk1.X5BncQ.iNJHaa-q8ry-n7GUm-jWRI0Qo-k");
