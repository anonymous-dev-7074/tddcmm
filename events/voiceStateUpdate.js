module.exports = async(client, oldMember, newMember) => { 
 if (
    !client.channels.cache.get(
      client.settings.get(oldMember.guild.id, "userchannelcreate").channel
    ) ||
    !client.channels.cache.get(
      client.settings.get(oldMember.guild.id, "userchannelcreate").category
    )
  )
    return;

  if (oldMember.channel) {
    if (
      client.settings
        .get(oldMember.guild.id, "userchannels")
        .findIndex(obj => obj.channel === oldMember.channelID) < 0
    )
      return;
    if (oldMember.channel.members.size <= 0)
      oldMember.member.user.send(
        "You have left a personal voice channel, it will be removed in 30 seconds unless you join back. (because it is empty)"
      );
    setTimeout(() => {
      if (oldMember.channel.members.size <= 0) {
        if (!client.channels.get(oldMember.channelID)) return;
        client.settings.delete(
          oldMember.guild.id,
          `userchannels.${client.settings
            .get(oldMember.guild.id, "userchannels")
            .findIndex(obj => obj.channel === oldMember.channelID)}`
        );
        client.channels.get(oldMember.channelID).delete();
      }
    }, 30000);
    return;
  }

  if (
    client.settings.get(oldMember.guild.id, "userchannelcreate").channel ===
    newMember.channelID
  ) {
    oldMember.guild.channels
      .create(oldMember.member.user.username + `'s Channel`, { type: "voice" })
      .then(c => {
        c.setParent(
          client.settings.get(oldMember.guild.id, "userchannelcreate").category
        );
        client.settings.push(
          newMember.guild.id,
          { channel: c.id, author: newMember.id },
          "userchannels"
        );
        newMember.member.voice.setChannel(c);
        c.overwritePermissions({
          permissionOverwrites: [
            {
              id: newMember.member.user.id,
              allow: ["CONNECT"]
            },
            {
              id: newMember.guild.id,
              deny: ["CONNECT"]
            }
          ],
          reason: "Updated user channel!"
        });
      });
    return;
  }

  if (
    !client.settings
      .get(oldMember.guild.id, "userchannels")
      .includes(oldMember.channelID)
  )
    return;

  if (oldMember.channel) {
    if (oldMember.channel.members.size <= 0)
      oldMember.member.user.send(
        "You have left a personal voice channel, it will be removed in 30 seconds unless you join back. (because it is empty)"
      );
    setTimeout(() => {
      if (oldMember.channel.members.size <= 0) {
        if (!client.channels.cache.get(oldMember.channelID)) return;
        client.channels.cache.get(oldMember.channelID).delete();
      }
    }, 30000);
    return;
  }
};
