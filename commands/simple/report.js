const commando = require("discord.js-commando");

class ReportCommand extends commando.Command {
    constructor(client) {
        super(client, {name:"report", group:"music", memberName:"report", description:"Report a user for bad behavior."})
    }

    async run(message, args) {
        if (!message.mentions.members.first()) {
            message.channel.send("User not found.\nUsage: !report <@mention> <reason>");
            return;
        }
        message.delete().catch(O_o => {});
        if (message.member.hasPermission("MANAGE_MESSAGES")) {
            let channel = message.guild.channels.find(c => c.name === "reports");
            if (!channel) {
                message.reply("Channel 'reports' not found.");
                return;
            }
            channel.send(args);
            message.reply("Report successful.")
            return;
        } else if(message.mentions.members.first().hasPermission("MANAGE_MESSAGES")) {
            message.channel.send("That person can't be reported!");
            return;
        }
        message.channel.send("You are not allowed to report other members.");
    }
}
module.exports = ReportCommand;