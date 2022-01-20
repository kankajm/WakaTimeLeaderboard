const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const dotenv = require('dotenv');
dotenv.config();

const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;
const token = process.env.DISCORD_TOKEN;

const commands = [
    new SlashCommandBuilder().setName('summary').setDescription('Replies with overall summary'),
    new SlashCommandBuilder().setName('user').setDescription('Get stats about specific user').addStringOption(option =>
        option.setName('username')
            .setDescription('The username of the user to get the summary of.')
            .setRequired(true)),
]

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
