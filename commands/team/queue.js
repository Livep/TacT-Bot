const commando = require("discord.js-commando");

class QueueCommand extends commando.Command {
    constructor(client) {
        super(client, {name:"queue", group:"team", memberName:"queue", description:"Lists member currently on queue."})
    }

    async run(message, args) {
        if (!servers[message.guild.id]) servers[message.guild.id] = {game_queue: [], music_queue: []};
        var queue = servers[message.guild.id].game_queue;
        message.channel.send("Members: " + queue[0] + ", " +  queue[1] + ", " + queue[2] + ", " + queue[3] + ", " + queue[4]);
    }
}
module.exports = QueueCommand;