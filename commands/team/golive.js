const commando = require("discord.js-commando");

class GoLiveCommand extends commando.Command {
    constructor(client) {
        super(client, {name:"golive", group:"team", memberName:"golive", description:"Announce your stream to the server."})
    }

    async run(message, args) {
        message.channel.send("Not implemented!");
        message.delete(100);
    }
}
module.exports = GoLiveCommand;