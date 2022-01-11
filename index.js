const dotenv = require('dotenv');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const { getLeaderboard } = require('./requests');
const { singleUserEmbed, summaryEmbed } = require('./embeds');

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName, options } = interaction;

    let data = await getLeaderboard();

    switch(commandName) {
        case "summary":
            await interaction.reply({ embeds: [await summaryEmbed(data)] });
            break;
        case "user":
            const username = options._hoistedOptions[0].value;
            const user = data.find(user => user.username === username);
            await interaction.reply({ embeds: [await singleUserEmbed(user, username)] });
            break;
    }
});

dotenv.config();

client.login(process.env.DISCORD_TOKEN).then(() => {
    console.log(`Logged in as ${client.user.tag}!`);
});