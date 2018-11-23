const commando = require("discord.js-commando");

class JoinCommand extends commando.Command {
    constructor(client) {
        super(client, {name:"join", group:"music", memberName:"join", description:"Joins the voice channel of the commander."})
    }

    async run(message, args) {
        if (message.member.voiceChannel) {
            if(!message.guild.voiceConnection) {
                message.member.voiceChannel.join()
                .then(connection => {
                    message.reply("Successfully joined your channel.");
                });
            }
        } else {
            message.reply("you're not in a voice channel.");
        }
    }
}
module.exports = JoinCommand;