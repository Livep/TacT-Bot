const commando = require("discord.js-commando");
const discord = require("discord.js");

class ReportCommand extends commando.Command {
    constructor(client) {
        super(client, {name:"report", group:"chat", memberName:"report", description:"Report a user for bad behavior.", examples:["!report @user <reason>"]})
    }

    async run(message, args) {
        if (!message.mentions.members.first()) {
            message.channel.send("User not found.\nUsage: !report <@mention> <reason>");
            return;
        }
        let target = message.mentions.members.first();
        if (target.roles.find(r => r.name === "Team") || target.roles.find(r => r.name === "Team-Leader")) {
            message.channel.send("That person can't be reported!");
            return;
        }
        message.delete().catch(O_o => {});
        let channel = message.guild.channels.find(c => c.name === "moderation");
        if (!channel) {
            message.reply("This doen't work.");
            return;
        }
        let reason = args.replace(message.mentions.members.first(), "");
        let report = new discord.RichEmbed()
            .setColor(0xFF0000)
            .setTitle(`Report of ${target.displayName}`)
            .setDescription(reason)
            .addField("Reported by:", message.author.username)
            .addField("In Channel: ", message.channel.name)
            .addField("Timestamp:", message.createdAt)
        channel.send(report);
        message.reply("Report successful.")
        return;
    }
}
module.exports = ReportCommand;