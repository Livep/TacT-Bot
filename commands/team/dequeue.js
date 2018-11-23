const commando = require("discord.js-commando");

class DequeueCommand extends commando.Command {
    constructor(client) {
        super(client, {name:"dequeue", group:"team", memberName:"dequeue", description:"Removes you from queue."})
    }

    async run(message, args) {
        var tQueue = []
        for (let i = 0; i < queue.length; i++) {
            if (queue[i] == message.author) {
                for (let j = 0; j < queue.length; j++) {
                    if (queue[i] != message.author) {
                        tQueue.push(queue[i]);
                    }
                }
                queue = []
                for (let j = 0; j < tQueue.length; j++) {
                    queue.push(tQueue[j]);
                }
                message.reply("has been removed from queue.");
                message.delete(300);
                return;
            }
        }
        message.delete(300);
        message.reply("You are not queued => !enqueue to join.");
        
    }
}
module.exports = DequeueCommand;