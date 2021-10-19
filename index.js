const Discord = require('discord.js');
require("dotenv").config();

const client = new Discord.Client({ partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"] });

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);

    let Statuses = [`Visual Studio Code`, `${process.env.prefix}help for commands`];
    let StatusNumber = 0;
    function changeStatus() {
        if (StatusNumber >= Statuses.length) StatusNumber = 0;
        client.user.setActivity({
            name: Statuses[StatusNumber],
            type: "PLAYING"
        });

        StatusNumber++;
    }
    changeStatus();
    setInterval(changeStatus, 5000);
});

client.on("message", message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(process.env.prefix)) return;

    const args = message.content.slice(process.env.prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    console.log(`${message.member.user.username} used command '${command}' with arguments '${args}'`);

    if (command == "help") {
        message.reply(new Discord.MessageEmbed()
            .setTitle("About me")
            .addField("Who am I?", "I am coding bot. I do coding and help people with coding.")
        );
    }
});

client.login(process.env.token);