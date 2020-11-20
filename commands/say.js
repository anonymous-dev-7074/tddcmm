const Discord = require("discord.js");
const { webhookID, webhookToken } = require("../../config.json"); //don't distab me

module.exports = {
  name: "say",
  category: "utility",
  description: "testing",
  usage: "+say (ur message)",
  run: async (client, message, args) => {
    const webhookClient = new Discord.WebhookClient(webhookID, webhookToken);

    let argsresult = args.join(" ");
    if (argsresult) {
      let matches = argsresult.match(/{:([a-zA-Z0-9-_~]+)}/g);
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
  } // try
}; // ok sir 🔥
