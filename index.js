const Discord = require('discord.js');
const client = new Discord.Client();
require("./logs.js");
const db = require("quick.db")
let beingApplied = new Set();
const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL"],
  fetchAllMembers: true,
  disableEveryone: true
});
const fs = require("fs");
let cooldown = new Set();
client.cooldown = cooldown;
const Enmap = require("enmap");
client.commands = new Discord.Collection();
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
client.once('ready', () => {
	console.log('Ready!');
});
String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};


client.login("NzY4NTE3MjI2NjU0ODU5Mjk1.X5BncQ.RMW0Gm8ioj5c0MGukIR9T67NyrA");
