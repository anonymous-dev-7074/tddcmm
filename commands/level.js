const { MessageEmbed } = require('discord.js')
const canvacord = require("canvacord")
const db = require("quick.db")
const status1 = {
    online: "online",
    idle: "idle",
    dnd: "dnd",
    offline: "offline"
};
const status2 = {
    online: "#00ffff",
    idle: "YELLOW",
    dnd: "RED",
    offline: "GREY"
};
const discord = require("discord.js")

exports.run = (client, msg, args) => {
	let user = msg.mentions.users.first() || msg.guild.members.cache.find(mem => mem.user.username.toLowerCase() === args.join(" ").toLowerCase()) || msg.guild.members.cache.get(args[0])
	if (!user) user = msg.author
  let back = db.get(`lvlback_${msg.guild.id}`)
  let hh = user.username
      let bb = user.discriminator
    const Level = client.profile.get(`${msg.guild.id}-${user.id}`, "level")
    const XP = client.profile.get(`${msg.guild.id}-${user.id}`, "levelpoints")
    const xpForLevel = level => Math.ceil(level*level*100);
    const calcLevel = xp => Math.floor(0.1*Math.sqrt(xp));
    const curLevel = calcLevel(client.profile.get(`${msg.guild.id}-${user.id}`, "levelpoints")) // 2
    const pointsNeeded = xpForLevel(curLevel + 1);
    let uLevel = Level + 1;
   const rank = new canvacord.Rank()
            .setAvatar(user.displayAvatarURL({ dynamic: true })) 
            .setCurrentXP(XP)
            .setRequiredXP(pointsNeeded)
            .setStatus(status1[user.presence.status])
            .setProgressBar(status2[user.presence.status])
            .setUsername(hh)
            .setDiscriminator(bb)
            .setLevel(Level)
            .setRank(uLevel)
            .setBackground("IMAGE", back || "https://media.discordapp.net/attachments/696417925418057789/744447998490312714/060.png?width=766&height=431")

        rank.build()
    .then(data => {
        const attachment = new discord.MessageAttachment(data);
        msg.channel.send(attachment);
    });
    }

module.exports.help = {
    name:"level",
    usage: "!level"
  }