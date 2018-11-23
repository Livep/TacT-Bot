const commando = require("discord.js-commando");

class ClearCommand extends commando.Command {
    constructor(client) {
        super(client, {name:"clear", group:"simple", memberName:"clear", description:"Deletes your last message."})
    }

    async run(message, args) {
        try {
            let number = parseInt(args.split(" ")[0]);
            if (args == "") number = 10;
            if (message.member.hasPermission("MANAGE_MESSAGES")) {
                message.channel.bulkDelete(number);
            }
        } catch(e) {
            message.channel.send("Failed to clear the channel.");
            console.log(e);
        }
    }
}
module.exports = ClearCommand;