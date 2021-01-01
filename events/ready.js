const { Shoukaku } = require('shoukaku');
const config = require("../config.json");
const LavalinkServer = config.nodes;
const ShoukakuOptions = { moveOnDisconnect: false, resumable: false, resumableTimeout: 30, reconnectTries: 2, restTimeout: 10000 };
const Queue = require('../modules/Queue.js');
const { MessageEmbed } = require("discord.js")

module.exports = async(client) => {
client.user.setActivity(`+help | ${client.guilds.cache.size} guilds`, {type: "WATCHING"})
  client.blacklisted.ensure(client.user.id, {
    blacklistedusers: []
  });
console.log(`${client.user.tag} is online!`)
client.shoukaku = new Shoukaku(client, LavalinkServer, ShoukakuOptions);
client.queue = new Queue(client);
        client.shoukaku.on('ready', (name) => console.log(`Lavalink ${name}: Ready!`));
        client.shoukaku.on('error', (name, error) => console.error(`Lavalink ${name}: Error Caught,`, error));
        client.shoukaku.on('close', (name, code, reason) => console.warn(`Lavalink ${name}: Closed, Code ${code}, Reason ${reason || 'No reason'}`));
        client.shoukaku.on('disconnected', (name, reason) => console.warn(`Lavalink ${name}: Disconnected, Reason ${reason || 'No reason'}`));



}
