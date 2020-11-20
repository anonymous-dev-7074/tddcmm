const Discord = require('discord.js');
const client = new Discord.Client({timeout: 60000,         ws: {
            intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_BANS", "GUILD_VOICE_STATES", "GUILD_MESSAGE_REACTIONS", "DIRECT_MESSAGES", "DIRECT_MESSAGE_REACTIONS"]
        }});
require("./logs.js");
const db = require("quick.db")
let beingApplied = new Set();

const fs = require("fs");
let cooldown = new Set();
client.cooldown = cooldown;
const Enmap = require("enmap");
client.beingApplied = beingApplied;
client.config = require("./config.json")
client.profile = new Enmap({ name: "profile", fetchAll: true });
client.settings = new Enmap({ name: "settings", fetchAll: false, autoFetch: true, cloneLevel: 'deep' });
client.reactionroles = new Enmap({ name: "reactionroles", fetchAll: true });
client.blacklisted = new Enmap({ name: "blacklisted" });
client.applications = new Enmap({ name: "applications", fetchAll: true });
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
console.log(`Loaded ${files.length} events!`)
    client.on(eventName, event.bind(null, client));
  });
});

client.on("message", async message => {
   
let argsresult = args.join(" ");
    if (argsresult) {
      let matches = argsresult.match(/:([a-zA-Z0-9-_~]+):/g);
      if (matches)
        for (const match of matches) {
          const rep = await client.emojis.cache.find(
            emoji => emoji.name === match.substring(2, match.length - 1)
          );
          if (rep) argsresult = argsresult.replace(match, rep);
        }
    }
    // what u want to fetch with the avatar?
    message.channel
      .fetchWebhooks() // This gets the webhooks in the channel
      .then(webhook => {
        let foundHook = webhook.find(wb => wb.name === client.user.username);
        if (!foundHook) {
          message.channel
            .createWebhook(client.user.username, client.user.displayAvatarURL())
            .then(web => {
              web.send(argsresult, {
                username: message.author.username,
                avatarURL: message.author.displayAvatarURL()
              });
            });
        } else {
          foundHook.send(argsresult, {
            username: message.author.username,
            avatarURL: message.author.displayAvatarURL()
          });
        }
      });
    message.delete();
});


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir(`./commands/`, (err, files) => {
  if(err) console.log(err)
files.forEach(f => {
  if(!f.endsWith(".js")) return;
if(f.length <= 0) return console.log(" No commands")
console.log(f + " Loaded")
let command = require(`./commands/${f}`)
client.commands.set(command.help.name, command)
if(command.help.aliases) {command.help.aliases.forEach(alias => {
client.aliases.set(alias, command.help.name)
})
}
})
})

client.once('ready', () => {
	console.log('Ready!');
});
String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};


client.login("NzY4NTE3MjI2NjU0ODU5Mjk1.X5BncQ.RMW0Gm8ioj5c0MGukIR9T67NyrA");
