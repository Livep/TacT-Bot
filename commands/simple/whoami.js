const commando = require("discord.js-commando");
const discord = require("discord.js");

class WhoamiCommand extends commando.Command {
    constructor(client) {
        super(client, {name:"whoami", group:"simple", memberName:"whoami", description:"Information about yourself."})
    }

    async run(message, args) {
        var widget = new discord.RichEmbed()
                        .setColor(0xA926B1)
                        .setThumbnail(message.member.user.avatarURL)
                        .setAuthor("TransacT-eSports Info")
                        .setTitle(message.member.displayName)
                        .setDescription(`Nick Name: ${message.member.nickname}`)
                        .addField("ID: ", message.member.id)
                        .addField("Highest Role: ", message.member.highestRole)
                        .addField("Bot: ", message.member.user.bot)
        message.channel.send(widget)
    }
}
module.exports = WhoamiCommand;