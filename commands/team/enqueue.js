const commando = require("discord.js-commando");
const discord = require("discord.js");

class EnqueueCommand extends commando.Command {
    constructor(client) {
        super(client, {name:"enqueue", group:"team", memberName:"enqueue", description:"Add yourself to the queue."})
    }

    async run(message, args) {
        for (let i = 0; i < queue.length; i++) {
            if (queue[i] == message.author) {
                message.reply("You are already in queue. If you want to leave => !dequeue")
                message.delete(300);
                return;
            }
        }
        queue.push(message.author);
        message.reply(" has been added to the queue. (" + queue.length + "/5)");
        if (queue.length == 5) {
            message.channel.send("Your team is ready to go! Members: " + queue[0] + ", " +  queue[1] + ", " + queue[2] + ", " + queue[3] + ", " + queue[4]);
            queue = []
        }
        message.delete(300);
    }
}

module.exports = EnqueueCommand;