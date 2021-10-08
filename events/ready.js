module.exports = async (client) => {
  client.Ready = true,
    client.user.setPresence({
      status: "online",  // You can show online, idle, and dnd
      activity: {
        name: `pokoes | ${client.botconfig.DefaultPrefix}help`,  // The message shown
        type: "PLAYING", // PLAYING, WATCHING, LISTENING, STREAMING,
      }
    });

  client.on('message', (message) => {
    //if (message.author.bot) return;
    //console.log(`[${message.author.tag}]: ${message.content}`);
    if (message.content.toLowerCase() === 'heil') {
      message.react('856486001740742668');
    }
    if (message.content.toLowerCase() === 'neger') {
      message.react('824192334358904864');
    }
    if (message.content.toLowerCase() === 'nigger') {
      message.react('824192334358904864');
    }
    if (message.channel.id == '757526190704820225') {
      if (message.content.toLowerCase() === 'nigga') {
        message.channel.send("nigga");
        message.react('824192334358904864');
        /*if(Math.floor(Math.random() * 100) == 55) {
          var ping_gravechest = message.channel.send("<@523865031407042571>").then(message => message.delete());
        }
        if(Math.floor(Math.random() * 20) == 15) {
          var ping_kutkakker = message.channel.send("<@399875082081796096>").then(message => message.delete());
        }*/
      }
    }
  })

  client.Manager.init(client.user.id);
  client.log("Successfully Logged in as " + client.user.tag); // You can change the text if you want, but DO NOT REMOVE "client.user.tag"
  client.RegisterSlashCommands();
};