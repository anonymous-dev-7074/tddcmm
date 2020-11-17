const Discord = require('discord.js');
const client = new Discord.Client({timeout: 60000});
require("./logs.js");
const db = require("quick.db")
let beingApplied = new Set();

const fs = require("fs");
let cooldown = new Set();
client.cooldown = cooldown;
const Enmap = require("enmap");
client.config = require("./config.json")
client.profile = new Enmap({ name: "profile", fetchAll: true });
client.settings = new Enmap({ name: "settings", fetchAll: true });
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
let command = require(`./commands/${module}/${f}`)
client.commands.set(command.help.name, command)
command.help.aliases.forEach(alias => {
client.aliases.set(alias, command.help.name)
})
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
