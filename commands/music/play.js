const commando = require("discord.js-commando");
const ytdl = require("ytdl-core");

function quit(server) {
    if(server.queue[0]) play(connection, message);
    else connection.disconnect();
}

function play(connection, message) {
    if (!servers[message.guild.id]) servers[message.guild.id] = {queue: []};
    var server = servers[message.guild.id];
    server.dispatcher = connection.playStream(ytdl((server.queue[0]), {filter: "audioonly"}));
    server.queue.shift();
    server.dispatcher.on("end", quit(server));
}

class PlayCommand extends commando.Command {
    constructor(client) {
        super(client, {name:"play", group:"music", memberName:"play", description:"Play your favourite music!"})
    }

    async run(message, args) {
        if (message.member.voiceChannel) {
            if(!message.guild.voiceConnection) {
                if (!servers[message.guild.id]) servers[message.guild.id] = {queue: []};
                message.member.voiceChannel.join()
                .then(connection => {
                    var server = servers[message.guild.id]
                    server.queue.push(args);
                    play(connection, message);
                    message.reply("Now playing: " + args);
                });
            }
        } else {
            message.reply("you're not in a voice channel.");
        }
    }
}

module.exports = PlayCommand;