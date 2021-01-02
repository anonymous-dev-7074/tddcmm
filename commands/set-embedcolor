const discord = require("discord.js");
const db = require ('quick.db');
var validator = require('validator');

module.exports = {
help : {
  name: "set-embedcolor",
  aliases: ["setembedcolor"],
  description: ""
},
  run: async (client, message, args) => {
if(!message.member.hasPermission(8))return
if(!validator.isHexCode(args[0])) return message.reply('Please provide a hex code.')
db.set(`ec_${message.guild.id}`, `${args[0]}`)
message.channel.send({embed: {
color: args[0],
description: 'Successfully updated the welcome embed color.'
}})
}}
