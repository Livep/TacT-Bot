const commando = require("discord.js-commando");

class FlipCommand extends commando.Command {
    constructor(client) {
        super(client, {name:"flip", group:"simple", memberName:"flip", description:"Flips a coin, landing either Heads or Tails"})
    }

    async run(message, args) {
        if (Math.random() < 0.5) message.reply("Your coin landed on Heads!");
        else message.reply("Your coin landed on Tails!");
    }
}
module.exports = FlipCommand;