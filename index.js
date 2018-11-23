const commando = require("discord.js-commando");
const bot = new commando.Client();
const TOKEN = "NTEzMDYxMTU0NjM4MDA0MjYz.DtCp-Q.XFgMzuIVd6lTDf5_dx1Zi9Gy0Lg";

bot.registry.registerGroup("simple", "Simple");
bot.registry.registerGroup("music", "Music");
bot.registry.registerGroup("chat", "Chat");
bot.registry.registerGroup("team", "Team");
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");

global.servers = {}

function messageEvent(message) {
    let msg = message.content.split(" ");
    let cmd = msg[0];
    let args = msg.slice(1);
    if (cmd === "ping") {
        message.channel.send("Pong!");
    }
}

function startup() {
    console.log(`${bot.guilds.size} instances of ${bot.user.username} are currently online.`)
    bot.user.setActivity("!help",{type: "LISTENING"});
}

function memberJoin(member) {
    const channel = member.guild.channels.find("name", "welcome");
    if (!channel) return;
    channel.send("Willkommen, ${member} auf dem offiziellen TransacT-eSports Discord.")
}

function memberLeft(member) {
    const channel = member.guild.channels.find(ch => ch.name === "welcome");
    if (!channel) return;
    channel.send("Aufwiedersehen, " + member.displayName + ".");
    member.addRole(member.guild.roles.find("name", "Spieler"));

}

bot.on("message", messageEvent);
bot.on("ready", startup);
bot.on("guildMemberAdd", memberJoin);
bot.on("guildMemberRemove", memberLeft);
bot.login(TOKEN);
