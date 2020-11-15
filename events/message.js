const db = require("quick.db");
module.exports = async(client, message) => { 
const msg = message;
const cooldown = client.cooldown;
if (msg.channel.type == "dm") return;
  client.settings.ensure(msg.guild.id, {
    roles: [],
    prefix: "+",
    messageroles: [],
    levelsystem: true,
    message: "Not set",
    channel: 0,
    xpgain: [{ first: 0, second: 30 }],
    noxproles: [],
    noxpchannels: [],
    userchannels: [],
    userchannelcreate: { category: "none", channel: "none" },
    antiinvite: false,
    roleschannel: "none",
    imagechannel: [],
    doublexproles: [],
    welcomeroles: [],
    welcomechannel: "none",
    welcomemessage: [
      { message: "none" },
      {
        title: "none",
        description: "none",
        image: "none",
        footer: "none",
        color: "none",
        embed: false
      }
    ]
  });
  let regex = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/;
  if (
    regex.test(msg.content) &&
    client.settings.get(msg.guild.id, "antiinvite")
  ) {
    if (msg.member.permissions.has("ADMINISTRATOR")) return;
    msg.channel
      .send(`***${msg.author.tag}***, invite links are not allowed!`)
      .then(m => m.delete({ timeout: 10000 }));
    msg.delete();
  }

  if (msg.author.bot) return;

  client.applications.ensure(msg.guild.id, {
    applications: [],
    application: [],
    message: "none"
  });
  client.reactionroles.ensure(msg.guild.id, {
    roles: []
  });

  client.profile.ensure(`${msg.guild.id}-${msg.author.id}`, {
    id: msg.author.id,
    guild: msg.guild.id,
    level: 0,
    levelpoints: 0,
    lastMessage: "none"
  });

  if (!client.profile.has(`${msg.guild.id}-${msg.author.id}`, "lastMessage")) {
    client.profile.set(
      `${msg.guild.id}-${msg.author.id}`,
      "none",
      "lastMessage"
    );
  } else if (!client.settings.has(msg.guild.id, "userchannels")) {
    client.settings.set(msg.guild.id, [], "userchannels");
  } else if (!client.settings.has(msg.guild.id, "userchannelcreate")) {
    client.settings.set(
      msg.guild.id,
      { category: "none", channel: "none" },
      "userchannelcreate"
    );
  }

  if (client.settings.get(msg.guild.id, "roleschannel") !== "none") {
    if (msg.channel.id === client.settings.get(msg.guild.id, "roleschannel")) {
      msg.delete();
    }
  }

  if (client.settings.get(msg.guild.id, "imagechannel").length) {
    for (
      let i = 0;
      i < client.settings.get(msg.guild.id, "imagechannel").length;
      i++
    ) {
      if (
        client.settings.get(msg.guild.id, "imagechannel")[i] ===
          msg.channel.id &&
        msg.attachments.size < 1
      ) {
        msg.delete();
        msg.author.send(
          "You said something that was not an image in an `image only` channel!"
        );
      }
    }
  }

  let points = Math.floor(
    Math.random(client.settings.get(msg.guild.id, "xpgain")[0].first) *
      client.settings.get(msg.guild.id, "xpgain")[0].second
  );
  let randomcooldown = Math.floor(Math.random() * 8000) + 5000;
  if (cooldown.has(`${msg.author.id}-${msg.guild.id}`)) {
    points = 0;
  } else if (
    client.profile.get(`${msg.guild.id}-${msg.author.id}`, "lastMessage") ===
    msg.content
  ) {
    points = 0;
  }

  client.profile.set(
    `${msg.guild.id}-${msg.author.id}`,
    msg.content,
    "lastMessage"
  );

  client.settings.get(msg.guild.id, "doublexproles").forEach(r => {
    if (msg.guild.member(msg.author).roles.cache.find(r => r.name === r)) {
      points = points * 2;
    }
  });

  let array3 = client.settings.get(msg.guild.id, "noxpchannels");
  if (array3.length) {
    array3.forEach(c => {
      if (c == msg.channel.id) {
        points = 0;
      }
    });
  }

  let array2 = client.settings.get(msg.guild.id, "noxproles");
  if (array2.length) {
    array2.forEach(r => {
      let member = msg.guild.member(msg.author);

      let roletofind = msg.guild.roles.cache.find(n => n.name === r);
      if (member.roles.cache.find(r => r.name === r)) {
        points = 0;
      }
    });
  }

  if (client.settings.get(msg.guild.id, "levelsystem") === false) {
    points = 0;
  }
  client.profile.math(
    `${msg.guild.id}-${msg.author.id}`,
    "+",
    points,
    "levelpoints"
  );
  cooldown.add(`${msg.author.id}-${msg.guild.id}`);

  //client.profile.inc(`${msg.guild.id}-${msg.author.id}`, "levelpoints")

  setTimeout(() => {
    cooldown.delete(`${msg.author.id}-${msg.guild.id}`);
  }, randomcooldown);

  const curLevel = Math.floor(
    0.1 *
      Math.sqrt(
        client.profile.get(`${msg.guild.id}-${msg.author.id}`, "levelpoints")
      ) +
      1
  );

  const { MessageEmbed } = require("discord.js");
  if (
    client.profile.get(`${msg.guild.id}-${msg.author.id}`, "level") < curLevel
  ) {
    let message = client.settings.get(msg.guild.id, "message");
    let channel = client.settings.get(msg.guild.id, "channel");

    if (!channel) channel = msg.channel.id;
    if (message == "Not set")
      message = `{user} has leveled up to level **{level}**! `;
    if (client.profile.get(`${msg.guild.id}-${msg.author.id}`, "level") === 0) {
      client.profile.set(`${msg.guild.id}-${msg.author.id}`, 1, "level");
    } else if (
      client.profile.get(`${msg.guild.id}-${msg.author.id}`, "level") > 0
    ) {
      client.channels.cache
        .get(channel)
        .send(
          message.replace("{user}", msg.author).replace("{level}", curLevel)
        );
    }

    client.profile.set(`${msg.guild.id}-${msg.author.id}`, curLevel, "level");

    let array = client.settings.get(msg.guild.id, "roles");

    let data = array.findIndex(obj => obj.level === curLevel);
    if (data < 0) return;

    msg.guild.member(msg.author).roles.add(array[data].role);
    msg.channel
      .send(
        "You leveled up to level **" +
          curLevel +
          "** and was rewarded with the role " +
          msg.guild.roles.get(array[data].role).toString() +
          " 👍"
      )
      .then(m => {
        setTimeout(() => {
          m.delete();
        }, 5000);
      });
  }

  if (msg.content.indexOf(client.settings.get(msg.guild.id, "prefix")) !== 0)
    return;

  const args = msg.content
    .slice(client.settings.get(msg.guild.id, "prefix").length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();

  const cmd = client.commands.get(command);

  if (!cmd) return;
  if (
    client.blacklisted
      .get(client.user.id, "blacklistedusers")
      .includes(msg.author.id)
  ) {
    return msg.reply(
      "You have been blacklisted from using this bot, if this is a mistake then please dm `cex#0001`."
    );
  }
  cmd.run(client, msg, args);
};
