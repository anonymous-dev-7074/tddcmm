module.exports = (client, guild) => {
client.settings.set(guild.id, {
    roles: [],
    prefix: "+",
    messageroles: [],
    levelsystem: true,
    message: "Not set",
    channel: 0,
    xpgain: [{ first: 0, second: 30 }],
    noxproles: [],
    noxpchannels: [],
    userchannels: [],
    userchannelcreate: { category: "none", channel: "none" },
    antiinvite: false,
    roleschannel: "none",
    imagechannel: [],
    doublexproles: [],
    welcomeroles: [],
    welcomechannel: "none",
    welcomemessage: [
      { message: "none" },
      {
        title: "none",
        description: "none",
        image: "none",
        footer: "none",
        color: "none",
        embed: false
      }
    ]
  });
}
