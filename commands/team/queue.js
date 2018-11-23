const commando = require("discord.js-commando");

class QueueCommand extends commando.Command {
    constructor(client) {
        super(client, {name:"queue", group:"team", memberName:"queue", description:"Lists member currently on queue."})
    }

    async run(message, args) {
        message.channel.send("Members: " + queue[0] + ", " +  queue[1] + ", " + queue[2] + ", " + queue[3] + ", " + queue[4]);
    }
}
module.exports = QueueCommand;