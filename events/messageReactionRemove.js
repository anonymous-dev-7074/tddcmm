module.exports = async(client, reaction, user) => {
  if (user.bot) return;
  if (reaction.message.partial) {
    try {
      await reaction.message.fetch();
    } catch (err) {
      console.log("error fetching the message " + err);
    }
  }
const beingApplied = client.beingApplied;

  let array = client.reactionroles.get(reaction.message.guild.id, "roles");

  if (array.findIndex(obj => obj.messageid === reaction.message.id) > -1) {
    let array1 = client.reactionroles.get(
      reaction.message.guild.id,
      `roles.${array.findIndex(
        obj => obj.messageid === reaction.message.id
      )}.roles`
    );
    let value;
    if (array1.findIndex(obj => obj.emoji === reaction.emoji.name) > -1)
      value = array1.findIndex(obj => obj.emoji === reaction.emoji.name);
    if (array1.findIndex(obj => obj.emoji === reaction.emoji.id) > -1)
      value = array1.findIndex(obj => obj.emoji === reaction.emoji.id);

    if (value > -1) {
      reaction.message.guild.member(user).roles.remove(array1[value].role);

      return;
    }
  }
}
