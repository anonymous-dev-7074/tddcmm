const { MessageEmbed } = require("discord.js");

const { MessageAttachment } = require("discord.js");
const canvacord = require("canvacord");
const Discord = require("discord.js");

exports.run = (client, msg, args) => {
  let user =
    msg.mentions.users.first() ||
    msg.guild.members.cache.find(
      mem => mem.user.username.toLowerCase() === args.join(" ").toLowerCase()
    ) ||
    msg.guild.members.cache.get(args[0]);

  var userm = msg.mentions.users.first() || msg.author;

  if (!user) user = msg.author;
  const xpForLevel = level => Math.ceil(level * level * 100);
  const calcLevel = xp => Math.floor(0.1 * Math.sqrt(xp));
  const curLevel = calcLevel(
    client.profile.get(`${msg.guild.id}-${user.id}`, "levelpoints")
  ); // 2
  const pointsNeeded = xpForLevel(curLevel + 1);
  const Level = client.profile.get(`${msg.guild.id}-${user.id}`, "level");
  const avatar = userm.displayAvatarURL({ format: "png" });

  const card = new canvacord.Rank({
    Username: user.username,
    Discriminator: user.discriminator,
    Level: Level,
    CurrentXP: curLevel.toString(),
    RequiredXP: pointsNeeded.toString(),
    Status: user.presence.status,
    Avatar: avatar,
    color: "white"
  });

  card.build();
  const attachment = new Discord.MessageAttachment(card, "RankCard.png");
  msg.channel.send(attachment);
};

module.exports.help = {
  name: "level",
  usage: "!level"
};
