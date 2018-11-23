const commando = require("discord.js-commando");

class ClearCommand extends commando.Command {
    constructor(client) {
        super(client, {name:"clear", group:"simple", memberName:"clear", description:"Deletes your last message."})
    }

    async run(message, args) {
        message.delete(100);
    }
}
module.exports = ClearCommand;