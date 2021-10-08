const { DiscordMusicBot } = require('../structures/DiscordMusicBot');
const { VoiceState, MessageEmbed} = require("discord.js");
const { TrackUtils, Player } = require("erela.js");

// TODO: Werkt niet 2 keer als bot niet goed wordt gedisconnect
async function irriteren(client, guildId, channel, url) {

  const player = client.Manager.create({
      guild: guildId,
      voiceChannel: channel.id,
      textChannel: "885947711898157086",
      selfDeafen: false,
  });

  if (player.state != "CONNECTED") await player.connect();

  let Searched = await player.search(url);
  let track = Searched.tracks[0];
  await player.play(track);
}

async function earrape(channel) {
  for (i = 50; i > 0; i--) {
    channel.join();
    await timeout(100);
    channel.leave()
    await timeout(100);
    // console.log(`we are at ${i}`);
  }
  await timeout(100);
  await channel.leave();
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 *
 * @param {DiscordMusicBot} client
 * @param {VoiceState} oldState
 * @param {VoiceState} newState
 * @returns {Promise<void>}
 */
module.exports = async (client, oldState, newState) => {
    // skip bot users, just like the message event
    if (newState.member.user.bot) return;

    // get guild and player
    let guildId = newState.guild.id;
    const player = client.Manager.get(guildId);

    // prepreoces the data
    const stateChange = {};
    // get the state change
    if (oldState.channel === null && newState.channel !== null) stateChange.type = "JOIN";
    if (oldState.channel !== null && newState.channel === null) stateChange.type = "LEAVE";
    if (oldState.channel !== null && newState.channel !== null) stateChange.type = "MOVE";
    if (oldState.channel === null && newState.channel === null) return; // you never know, right


    // Alijn Join
    if (stateChange.type === "JOIN") {
       if(newState.member.user.id == "378857075641548802") {
        await earrape(newState.channel);
      }
    }

     // Jesse Join
     if (stateChange.type === "JOIN") {
      if(newState.member.user.id == "456502801166761984") {
        await irriteren(client, guildId, newState.channel, "https://cdn.discordapp.com/attachments/885947711898157086/889158332999405578/Untitled.mp3");
      }
    }


    // check if the bot is active (playing, paused or empty does not matter (return otherwise)
    if (!player || player.state !== "CONNECTED") return;

    // move check first as it changes type
    if (stateChange.type === "MOVE") {
        if (oldState.channel.id === player.voiceChannel) stateChange.type = "LEAVE";
        if (newState.channel.id === player.voiceChannel) stateChange.type = "JOIN";
    }
    if (stateChange.type === "JOIN") stateChange.channel = newState.channel;
    if (stateChange.type === "LEAVE") stateChange.channel = oldState.channel;

    // check if the bot's voice channel is involved (return otherwise)
    if (!stateChange.channel || stateChange.channel.id !== player.voiceChannel) return;

    // filter current users based on being a bot
    stateChange.members = stateChange.channel.members.filter(member => !member.user.bot);

    switch (stateChange.type) {
        case "JOIN":
            if (stateChange.members.size === 1 && player.paused) {
                let emb = new MessageEmbed()
                    .setAuthor(`Resuming paused queue`, client.botconfig.IconURL)
                    .setColor("RANDOM")
                    .setDescription(`Resuming playback because you left me with music to play when all of you just left me all alone`);
                await client.channels.cache.get(player.textChannel).send(emb);

                // update the now playing message and bring it to the front
                let msg2 = await client.channels.cache.get(player.textChannel).send(player.nowPlayingMessage.embeds[0])
                player.setNowplayingMessage(msg2);

                player.pause(false);
            }
            break;
        case "LEAVE":
            if (stateChange.members.size === 0 && !player.paused && player.playing) {
                player.pause(true);

                let emb = new MessageEmbed()
                    .setAuthor(`Paused!`, client.botconfig.IconURL)
                    .setColor("RANDOM")
                    .setDescription(`The player has been paused because everybody left`);
                await client.channels.cache.get(player.textChannel).send(emb);
            }
            break;
    }
}
