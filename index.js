const Discord = require('discord.js');
const client = new Discord.Client();
require("./faith.js");
require("./logs.js");

client.once('ready', () => {
	console.log('Ready!');
});

client.login("NzY4NTE3MjI2NjU0ODU5Mjk1.X5BncQ.RMW0Gm8ioj5c0MGukIR9T67NyrA");
