const Discord = require('discord.js');
const client = new Discord.Client({timeout: 60000,         ws: {
            intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_BANS", "GUILD_VOICE_STATES", "GUILD_MESSAGE_REACTIONS", "DIRECT_MESSAGES", "DIRECT_MESSAGE_REACTIONS"]
        }});
require("./logs.js");
const db = require("quick.db")
let beingApplied = new Set();
const { Shoukaku } = require('shoukaku');
const config = require("./config.json");
const LavalinkServer = config.nodes;
const ShoukakuOptions = { moveOnDisconnect: false, resumable: false, resumableTimeout: 30, reconnectTries: 2, restTimeout: 10000 };
const Queue = require('./modules/Queue.js');
const fs = require("fs");
let cooldown = new Set();
client.cooldown = cooldown;
const Enmap = require("enmap");
client.beingApplied = beingApplied;
client.config = require("./config.json")
client.shoukaku = new Shoukaku(client, LavalinkServer, ShoukakuOptions);
client.queue = new Queue(client);
        client.shoukaku.on('ready', (name) => console.log(`Lavalink ${name}: Ready!`));
        client.shoukaku.on('error', (name, error) => console.error(`Lavalink ${name}: Error Caught,`, error));
        client.shoukaku.on('close', (name, code, reason) => console.warn(`Lavalink ${name}: Closed, Code ${code}, Reason ${reason || 'No reason'}`));
        client.shoukaku.on('disconnected', (name, reason) => console.warn(`Lavalink ${name}: Disconnected, Reason ${reason || 'No reason'}`));
client.profile = new Enmap({ name: "profile", fetchAll: true });
client.formatDuration = require('./utils/formatDuration.js')
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


client.login("NzY4NTE3MjI2NjU0ODU5Mjk1.X5BncQ.5BogIRZHbeFGS_Zyg3s1nl7ggHs");
