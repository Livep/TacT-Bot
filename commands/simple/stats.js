const commando = require("discord.js-commando");
const discord = require("discord.js");
const rainbowSixApi = require('rainbowsix-api-node');
const r6 = new rainbowSixApi();

class StatsCommand extends commando.Command {
    constructor(client) {
        super(client, {name:"stats", group:"simple", memberName:"stats", description:"Shows the R6stats result for specific user"})
    }

    async run(message, args) {
        var parameters = args.split(" ");
        let uname = ""
        let pform  = "uplay"
        var stats;
        if (parameters[0] === "") {
            message.reply("No user specified! => !info <name> [platform{uplay(default), xone, ps4}]")
            message.delete(300);
            return;
        } else if (parameters.length >= 1) {
            uname = parameters[0];
            if (parameters.length === 2) {
                if (parameters[1] === "xone" || parameters[1] === "uplay" || parameters[1] === "ps4") {
                    pform = parameters[1];
                } else {
                    message.reply("Invalid platform! => uplay, xone or ps4")
                }
            }
        }
        try {
            r6.stats(uname, pform, false)
                .then(response => {
                    stats = response["player"]
                    var info = new discord.RichEmbed()
                        .setColor(0xA926B1)
                        .setAuthor("TransacT-eSports Stats")
                        .setTitle(stats["username"])
                        .setDescription("Overall stats:")
                        .addField("Level", stats["stats"]["progression"]["level"], true)
                        .addField("Playtime", (stats["stats"]["casual"]["playtime"] + stats["stats"]["ranked"]["playtime"])/360, true)
                        .addField("Kill/Death", (stats["stats"]["casual"]["kd"] + stats["stats"]["ranked"]["kd"])/2, true)
                        .addField("Kills", (stats["stats"]["casual"]["kills"] + stats["stats"]["ranked"]["kills"]), true)
                        .addField("Deaths", (stats["stats"]["casual"]["deaths"] + stats["stats"]["ranked"]["deaths"]), true)
                        .addField("Headshots", stats["stats"]["overall"]["headshots"], true)
                        .addField("Assists", stats["stats"]["overall"]["assists"], true)
                        .addField("Win/Lose", (stats["stats"]["casual"]["wlr"] + stats["stats"]["ranked"]["wlr"])/2, true)
                        .addField("Wins", (stats["stats"]["casual"]["wins"] + stats["stats"]["ranked"]["wins"]), true)
                        .addField("Losses", (stats["stats"]["casual"]["losses"] + stats["stats"]["ranked"]["losses"]), true)
                    message.channel.send(info);
                })
                .catch(error => {
                    console.log(error)
                    message.reply("Invalid username!")
                }
            );
        } catch(error) {
            console.log(error)
            message.channel.send("Internal Server Error");
            return;
        }
        message.channel.send("Fetching stats! This might take a while.")
    }
}
module.exports = StatsCommand;