const { MessageEmbed } = require('discord.js')

exports.run = async (client, msg, args) => {
  if(!msg.member.voice.channel) return msg.channel.send(`You're not in a voice channel.`);

    //If no music is provided
    if (!args[0]) return msg.channel.send(`Please specify a song to play.`);

    const aTrackIsAlreadyPlaying = client.player.isPlaying(msg.guild.id);

        //If there's already a track playing 
        if(aTrackIsAlreadyPlaying){

            //Add the track to the queue
            const result = await client.player.addToQueue(msg.guild.id, args.join(" ")).catch(() => {});
            if(!result) {
                msg.member.voice.channel.leave()
                return msg.channel.send(`This song provider is not supported.`)
            };

            if(result.type === 'playlist'){
                msg.channel.send(`${result.tracks.length} songs added to the queue.`);
            } else {
                msg.channel.send(`${result.name} added to the queue.`);
            }

        } else {

            //Else, play the song
            const result = await client.player.play(msg.member.voice.channel, args.join(" ")).catch(() => {});
            if(!result) {
                msg.member.voice.channel.leave()
                return msg.channel.send(`This song provider is not supported.`)
            };

            if(result.type === 'playlist'){
                msg.channel.send(`${result.tracks.length} songs added to the queue.\nCurrently playing ${result.tracks[0].name}`);
            } else {
                msg.channel.send(`Currently playing ${result.name}.`);
            }

            const queue = client.player.getQueue(msg.guild.id)

            //Events
            .on('end', () => {
                msg.channel.send(`There is no more music in the queue.`);
            })
            .on('trackChanged', (oldTrack, newTrack) => {
                msg.channel.send(`Now playing ${newTrack.name} ...`);
            })
            .on('channelEmpty', () => {
                msg.channel.send(`Music stopped, there are no more members in the voice channel.`);
            });
        }
}
exports.help = {
	name:"play",
	usage: "av <user>"
}