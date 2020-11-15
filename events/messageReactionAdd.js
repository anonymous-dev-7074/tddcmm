 const db = require("quick.db")

module.exports = async(client, reaction, user) => {
if (user.bot) return;
  if (reaction.message.partial) {
    try {
      await reaction.message.fetch();
    } catch (err) {
      console.log("error fetching the message " + err);
    }
  }

  if (
    reaction.message.id ===
    client.applications.get(reaction.message.guild.id, "message")
  ) {
    let i = 0;

    if (
      client.applications
        .get(reaction.message.guild.id, "applications")
        .findIndex(obj => obj.author === user.id) > -1
    ) {
      reaction.message.channel
        .send(
          user.tag +
            ", You already have an application under review! please wait until somebody `ACCEPTS` or `DENIES` it."
        )
        .then(m => m.delete({ timeout: 10000 }));
      return;
    }

    if (beingApplied.has(user.id)) {
      reaction.message.channel
        .send(
          user.tag +
            ", You already have an application going on, please wait until it has been finished."
        )
        .then(m => m.delete({ timeout: 10000 }));
      return;
    }

    let m = await user
      .send("Your application will now be started!")
      .then(m => m.delete({ timeout: 10000 }));
    beingApplied.add(user.id);
    while (
      client.applications.get(reaction.message.guild.id, "application").length -
        1 >=
      i
    ) {
      let { MessageEmbed } = require("discord.js");

      let embed = new MessageEmbed()
        .setTitle(`Application ${reaction.message.guild.name}`)
        .setDescription(
          client.applications.get(reaction.message.guild.id, "application")[i]
            .question
        )
        .setColor("RANDOM")
        .setFooter("You have 5 minutes to reply to this message.");
      let dmMessage = await user.send(embed);
      dmMessage.delete({ timeout: 300000 });
      let awaitQuestion = await dmMessage.channel.awaitMessages(
        res => res.author.id === user.id,
        {
          max: 1,
          time: 300000
        }
      );
      if (!awaitQuestion.size) return;
      if (awaitQuestion.first().content.length > 2000) {
        user.send("Answer can not exceed 2000 characters.");
        i++;
        beingApplied.delete(msg.author.id);
        continue;
      }
      dmMessage.delete();
      if (
        client.applications
          .get(reaction.message.guild.id, "applications")
          .findIndex(obj => obj.author === user.id) < 0
      ) {
        beingApplied.delete(user.id);
        client.applications.push(
          reaction.message.guild.id,
          {
            registered: Date.now(),
            author: user.id,
            answers: [
              {
                question: client.applications.get(
                  reaction.message.guild.id,
                  "application"
                )[i].question,
                answer: awaitQuestion.first().content
              }
            ]
          },
          "applications"
        );
        i++;
        continue;
      }
      beingApplied.delete(user.id);
      client.applications.push(
        reaction.message.guild.id,
        {
          question: client.applications.get(
            reaction.message.guild.id,
            "application"
          )[i].question,
          answer: awaitQuestion.first().content
        },
        `applications.${client.applications
          .get(reaction.message.guild.id, "applications")
          .findIndex(obj => obj.author === user.id)}.answers`
      );
      i++;
    }

    beingApplied.delete(user.id);
    user.send(`Your application has been registered! :white_check_mark:`);
  }
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
      reaction.message.guild.member(user).roles.add(`${array1[value].role}`);
      return;
    }
  }
}
