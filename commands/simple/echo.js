const commando = require("discord.js-commando");

class EchoCommand extends commando.Command {
    constructor(client) {
        super(client, {name:"echo", group:"simple", memberName:"echo", description:"Echo message to chat & console!"})
    }

    async run(message, args) {
        message.channel.send(message.content);
        message.delete(300);
        console.log(message.content);
    }
}
module.exports = EchoCommand;