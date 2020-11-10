const Discord = require("discord.js");
const fs = require("fs");
const packagefile = JSON.parse(fs.readFileSync("./package.json", "utf8"));
let days = 0;
let week = 0;
let { version } = require("discord.js");

module.exports = {
help: {
  name: "botinfo",
  aliases: ["about", "info"],
  description: "Show Information About Bot"
},
  run: async (client, message, args) => {
    let bot = client;

    let uptime = ``;
    let totalSeconds = client.uptime / 1000;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);

    if (hours > 23) {
      days = days + 1;
      hours = 0;
    }

    if (days == 7) {
      days = 0;
      week = week + 1;
    }

    if (week > 0) {
      uptime += `${week} week, `;
    }

    if (minutes > 60) {
      minutes = 0;
    }

    uptime += `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;

    let inline = true;
    let bicon = bot.user.displayAvatarURL;
    let usersize = bot.users.cache.size;
    let chansize = bot.channels.cache.size;
    let servsize = bot.guilds.cache.size;
    let botembed = new Discord.MessageEmbed()
      .setColor("BLACK")

      .setAuthor("TDDC BOT INFO", bicon)
      .setDescription(
        "Hii I Am Multi Purpose Bot Which Can Do Moderation, Music,Fun and Many More"
      )
      .addField("⇝Bot Developer", "Team TDDC", inline)
      .addField("⇝Bot Version", packagefile.version)
      .addField("⇝Total Users", usersize, inline)
      .addField("⇝Total Guilds", servsize, inline)
      .addField("⇝Bot Uptime", uptime, inline)
      .addField("⇝Bot Pings", `${bot.ws.ping}ms`, inline)
      .addField("⇝Discord.js Version", version, inline)
      .addField("⇝Bot Platform", `Linux`, inline)
      .addField(
        "⇝Support Server",
        `[Join The Official Server](https://discord.gg/ZmKtGCZ)`,
        inline
      )
      .setFooter(
        "TDDC OFFICIAL BOT",
        "https://cdn.discordapp.com/attachments/773102352939876364/773211537950244864/1604418366862.gif"
      );

    message.channel.send(botembed).then(async msg => {
      await msg.react("768723188258701365");
    });
  }
};
