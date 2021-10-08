module.exports = {
    name: 'earrape',
    description: "Earrape your fellow call buddies",
    run: async (client, message, args, { GuildDB }) => {
        const { voice } = message.member

        if (!voice.channelID) {
            message.reply("You must be in a voice channel").then(msg => {
                setTimeout(() => msg.delete(), 10000)
            })
            return
        }

        for (i = 20; i > 0; i--) {
            voice.channel.join()
            voice.channel.leave()
        }
        message.delete()
    }
}