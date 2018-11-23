const commando = require("discord.js-commando");

class leaveCommand extends commando.Command {
    constructor(client) {
        super(client, {name:"leave", group:"music", memberName:"leave", description:"Leave from a voice channel."})
    }

    async run(message, args) {
        if (message.guild.voiceConnection) {
            message.guild.voiceConnection.disconnect();
        } else {
            message.reply("I'm not in a voice channel.")
        }
    }
}
module.exports = leaveCommand;