const ws = require("ws");
const discord = require("discord.js");

module.exports = {
  name: "ping",
  aliases: ["pi"],
  category: "info",
  description: "Returns latency and API ping",
  run: async (client, message, args) => {
    message.channel.send(`Pong - ${client.ws.ping}ms`);
  }
};
