const { MessageEmbed } = require("discord.js")
      
module.exports = {
help: {
name: "queue",
aliases: []
},
run: async (client, message, args) => {
  const bot = client;
        const player = bot.queue.get(message.guild.id);

        if(!player || !player.current) return message.channel.send("No song currently playing in this guild.");

        let index = 1;

        let string = "";

            if(player.current) string += `__**Currently Playing**__\n ${player.current.info.title} - **Requested by ${player.current.info.requester.username}**. \n`;

            if(player.queue[0]) string += `__**Rest of queue:**__\n ${player.queue.slice(1, 10).map(x => `**${index++})** ${x.info.title} - **Requested by ${x.info.requester.username}**.`).join("\n")}`;

        const embed = new MessageEmbed()

            .setAuthor(`Current Queue for ${message.guild.name}`, message.guild.iconURL())

            .setThumbnail(player.current.thumbnail)
.setColor("RANDOM")
            .setDescription(string);

        return message.channel.send(embed);
}}
