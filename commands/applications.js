const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const { util } = require("discord.js-commando");
exports.run = async (client, msg, args) => {
  if (!msg.member.hasPermission("MANAGE_ROLES")) {
    return msg.reply("You do not have the required permissions to use this.");
  }
  let user = msg.mentions.users.first() || client.users.cache.get(args[0]);
  if (user) {
    let index = client.applications
      .get(msg.guild.id, "applications")
      .findIndex(obj => obj.author === user.id);
    if (index < 0)
      return msg.reply("This user does not have any active applications!");
    let arr = client.applications.get(msg.guild.id, "applications")[index];

    const paginated = util.paginate(arr.answers, 1, 1);

    let userEmbed = new MessageEmbed()
      .setTitle(user.tag + `(${user.id}) Application`)
      .setDescription(
        paginated.items.map(i => `__**${i.question}**__\n${i.answer}`)
      )
      .setColor("RANDOM")
      .setFooter(`Page 1 out of ${arr.answers.length}`);

    let m = await msg.channel.send(userEmbed);

    let i = 1;

    await m.react("◀️");
    await m.react("▶️");
    await m.react("❌");

    const filter = (reaction, user) =>
      (reaction.emoji.name === "◀️" && user.id === msg.author.id) ||
      (reaction.emoji.name === "▶️" && user.id === msg.author.id) ||
      (reaction.emoji.name === "❌" && user.id === msg.author.id);

    let reactionChoice = await m.createReactionCollector(filter, {
      time: 500000
    });

    reactionChoice.on("collect", r => {
      if (r.emoji.name === "◀️") {
        if (i === 1) {
          i = 1;
        } else if (i !== 1) {
          i--;
        }
      } else if (r.emoji.name === "▶️") {
        if (i === arr.answers.length) {
          i = arr.answers.length;
        } else if (i !== arr.answers.length) {
          i++;
        }
      }

      if (r.emoji.name === "❌") {
        m.delete();
        return;
      }

      const paginatedAfter = util.paginate(arr.answers, i, 1);
      let editEmbed = new MessageEmbed({
        title: user.tag + `(${user.id}) Application`,
        description: paginatedAfter.items
          .map(i => `__**${i.question}**__\n${i.answer}`)
          .join(" "),
        footer: {
          text: `Page ${i} out of ${
            client.applications.get(msg.guild.id, "application").length
          }`
        }
      });
      m.edit(editEmbed);
    });

    return;
  }

  if (!args[0]) args[0] = 1;

  let page = args[0];
  let thing = 1;
  let data = client.applications.get(msg.guild.id, "applications");
  const paginated = util.paginate(data, page, Math.floor(10));
  let embed = new MessageEmbed()
    .setColor("RANDOM")
    .setDescription(
      paginated.items.map(
        i =>
          `***${
            client.users.cache.get(i.author)
              ? client.users.cache.get(i.author).tag
              : "Unknown User"
          }(${i.author})*** => ${moment(i.registered).format("LLLL")}`
      )
    );
  msg.channel.send(embed);
};

module.exports.help = {
  name: "applications",
  aliases: [],
  usage: "!applications <page> || !applications <user>"
};
