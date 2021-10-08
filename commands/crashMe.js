module.exports = {
  name: 'crashme',
  description: "crashme",
  run: async (client, message, args, { GuildDB }) => {
    if (message.author.id == '260019013415862274') {
      await message.channel.send(`Bye :woozy_face:`);

      await process.exit();
    }
    else {
      return message.channel.send(`You cannot use this command <:Linus:778539196679716884>`);
    }
  }
}