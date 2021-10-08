module.exports = {
  name: 'avatar',
  description: "shows avatar",
  aliases: ["av"],

  run: async (client, message, args, { GuildDB }) => {
  let mentionedMember = message.mentions.members.first() ||message.guild.members.cache.get(args[0]);
  if (!mentionedMember) mentionedMember = message.member;

    const embed = new Discord.MessageEmbed()
      .setColor('#000000')
      .setTitle(mentionedMember.user.tag + "'s Avatar")
      .setImage(mentionedMember.user.displayAvatarURL());

      message.channel.send(embed)
  }
}