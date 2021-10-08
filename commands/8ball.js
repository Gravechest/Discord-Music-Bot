const { Util, MessageEmbed } = require("discord.js");

const answers = [
  'Nigga what is that question',
  'It is certain.',
  'It is decidedly so.',
  'Without a doubt.',
  'Yes - definitely.',
  'You may rely on it.',
  'As I see it, yes.',
  'Most likely.',
  'Outlook good.',
  'Yes.',
  'Signs point to yes.',
  //'Reply hazy, try again.',
  //'Ask again later.',
  //'Better not tell you now.',
  //'Cannot predict now.',
  //'Concentrate and ask again.',
  'Don\'t count on it.',
  'My reply is no.',
  'My sources say no.',
  'Outlook not so good.',
  'Very doubtful.'
];

module.exports = {
    name: "8ball",
    description: "Ask a question, get a answer",
    aliases: ["ball"],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, message, args, { GuildDB }) => {
    const question = args.join(' ');
    if (!question) return message.reply('Please provide a question to ask after the command').then(msg => {
      setTimeout(() => msg.delete(), 10000)
    });
    const embed = new MessageEmbed()
      .setTitle('🎱  The Magic 8-Ball  🎱')
      .addField('Question', question)
      .addField('Answer', `${answers[Math.floor(Math.random() * answers.length)]}`)
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor('#000000');
    message.channel.send(embed);
  }
}