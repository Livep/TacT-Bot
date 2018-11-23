const commando = require("discord.js-commando");

class DequeueCommand extends commando.Command {
    constructor(client) {
        super(client, {name:"dequeue", group:"team", memberName:"dequeue", description:"Removes you from queue."})
    }

    async run(message, args) {
        if (!servers[message.guild.id]) servers[message.guild.id] = {game_queue: [], music_queue: []};
        var queue = servers[message.guild.id].game_queue;
        if (queue.indexOf(message.author)+1) {
            queue.splice(queue.indexOf(message.author), 1);
            message.channel.send(message.author + " has been removed from queue.");
        } else {
            message.reply("You are not queued => !enqueue to join.");
        }
        message.delete(300);
        
    }
}
module.exports = DequeueCommand;