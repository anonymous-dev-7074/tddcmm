const { ErelaClient, Utils } = require("erela.js");
const { MessageEmbed } = require("discord.js")

module.exports = async(client) => {
client.user.setActivity(`+help | ${client.users.cache.size} guilds`, {type: "WATCHING"})
  client.blacklisted.ensure(client.user.id, {
    blacklistedusers: []
  });
console.log(`${client.user.tag} is online!`)
  client.music = new ErelaClient(client, client.config.nodes);
  client.music.on("nodeConnect", node => console.log("New node connected"));
  client.music.on("nodeError", (node, error) =>
    console.log(`Node error: ${error.message}`)
  );
  client.music.on("trackStart", (player, track) => {
    const { thumbnail } = track;
    const embed = new MessageEmbed()
      .addField(track.author, `**[${track.title}](${track.uri})**`)
      .addField("Duration", `${Utils.formatTime(track.duration, true)}`)
      .addField("Requested By", track.requester)
      .setFooter(player.voiceChannel.name)
      .setTimestamp()
      .setImage(
        `https://img.youtube.com/vi/${track.identifier}/maxresdefault.jpg`
      )
      .setColor("black");
    player.textChannel.send(embed);
})
  client.music.on("queueEnd", async player => {
    player.textChannel.send({embed: {color: "black",description: "Queue has ended."}})
    return client.music.players.destroy(player.guild.id)
    })
}
