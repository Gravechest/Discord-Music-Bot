const { Util, MessageEmbed } = require("discord.js");

module.exports = {
  name: "hack",
  description: "fuckin' leet yo, skrrrt",
  aliases: ["h4ck"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let hackercode = args.join(' ');
    if(message.author.id == "260019013415862274" ||
       message.author.id == "199526308441489409") {
        
        let result = eval(hackercode);
        message.channel.send(`Eval result:\n\`\`\`js\n${result}\n\`\`\``);
    }
  }
}