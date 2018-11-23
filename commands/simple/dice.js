const commando = require("discord.js-commando");

class DiceCommand extends commando.Command {
    constructor(client) {
        super(client, {name:"dice", group:"simple", memberName:"dice", description:"Rolls a six sided dice."})
    }

    async run(message, args) {
        message.reply("Your dice landed on " + Math.floor(Math.random()*6+1));
    }
}
module.exports = DiceCommand;