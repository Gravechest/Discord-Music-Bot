const { Util, MessageEmbed } = require("discord.js");
const size = [
  '8D',
  '8=D',
  '8==D',
  '8===D',
  '8====D',
  '8=====D',
  '8======D',
  '8=======D',
  '8========D',
  '8=========D',
  '8==========D',
  '8===========D',
  '8============D',
  '8=============D',
  '8==============D',
  '8=======================================================D'
];

module.exports = {
  name: 'penis',
  description: "How long is your slung?",
  aliases: ["pp", "ppsize"],
  run: async (client, message, args, { GuildDB }) => {
    const ppsize = size[Math.floor(Math.random() * size.length)];
    let mentionedMember = message.mentions.members.first() ||message.guild.members.cache.get(args[0]);
    if (!mentionedMember) mentionedMember = message.member;

    const embed = new MessageEmbed()
    .setColor('#FA6AFF')
    .addFields({
      name: (mentionedMember.user.tag + "'s Penis Length"),
      value: (ppsize),
    })

    message.channel.send(embed)
  }
}