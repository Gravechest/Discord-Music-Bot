module.exports = {
  name: 'say',
  description: "say what you want",
  run: async (client, message, args, { GuildDB }) => {
    const say = args.slice(0).join(" ");
    if (!say) return message.reply('Please provide a message to say').then(msg => {
        setTimeout(() => msg.delete(), 10000)
      });
    message.delete();
    return message.channel.send(say);
  }
}