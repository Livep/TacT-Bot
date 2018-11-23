const commando = require("discord.js-commando");

class ReportCommand extends commando.Command {
    constructor(client) {
        super(client, {name:"report", group:"music", memberName:"report", description:"Report a user for bad behavior."})
    }

    async run(message, args) {
        if (!message.guild.member(message.mentions.first)) {
            message.channel.send("User not found.\nUsage: !report <@mention> <reason>");
            return;
        }
        let reason = args.join(" ").slice(22);
        message.delete().catch(O_o => {});
        if (message.member.hasPermission("MANAGE_MESSAGES")) {
            message.reply(reason + ", " + message.mentions.first);
            return;
        } else if(message.guild.member(message.mentions.first).hasPermission("MANAGE_MESSAGES")) {
            message.channel.send("That person can't be reported!");
            return;
        }
        message.channel.send("You are not allowed to report other members.");
    }
}
module.exports = ReportCommand;