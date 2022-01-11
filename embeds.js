const { MessageEmbed } = require('discord.js');

const backticks = '``';

function putInBackticks(str) {
    return backticks + str + backticks;
}

function getMostFavouriteLanguage(languages) {
    if (languages[0] === undefined || languages[0] == null) {
        return 'None';
    }
    return languages[0].name;
}

function getFiveMostUsedLanguages(languages) {
    if (languages.length < 1) {
        return "None";
    }
    let final = "";
    for (let i = 0; i < 5; i++) {
        final += languages[i].name + " \n";
    }
    return final;
}

async function singleUserEmbed(user, username) {
    if (user === undefined) {
        return new MessageEmbed().setColor("RED").setTitle("User not found!");
    }
    let userFlagEmoji;

    try {
        userFlagEmoji = `:flag_${user.city.country_code.toLowerCase()}:`;
    } catch (err) {
        userFlagEmoji = ":flag_white:";
    }

    let embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`${username}'s stats`)
        .setURL('https://wakatime.com/leaders/sec/OnlyTunes%2BLeaderboard')
        .setDescription('Statistics from the last 7 days')
        .addFields(
            { name: 'Rank:', value: putInBackticks(user.rank), inline: true },
            { name: 'Country', value: `${userFlagEmoji}`, inline: true },
            { name: '\u200B', value: '\u200B' },
            { name: 'Total time', value: `${putInBackticks(user.human_readable_total)}`, inline: true },
            { name: 'Daily average', value: `${putInBackticks(user.human_readable_daily_average)}`, inline: true },
            { name: 'Favourite language', value: `${putInBackticks(getMostFavouriteLanguage(user.languages))}`, inline: true },
        )
        .addField('Top languages', `\`\`\`${getFiveMostUsedLanguages(user.languages)}\`\`\``, true)
        .setTimestamp();
    if (user.avatar != null || user.avatar !== undefined || user.avatar !== '') {
        embed.setThumbnail(`${user.avatar}?s=420`);
    }
    return embed;
}

async function summaryEmbed(data) {
    if (data === undefined) {
        return new MessageEmbed().setColor("RED").setTitle("Server error!");
    }
    let embed = new MessageEmbed()
        .setColor('YELLOW')
        .setTitle('Wakatime Leaderboard')
        .setURL('https://wakatime.com/leaders/sec/OnlyTunes%2BLeaderboard')
        .setDescription('Statistics from the last 7 days')
    for (let user of data) {
        embed.addFields({
            name: `${user.rank}. ${user.username}`,
            value: `Total: ${putInBackticks(user.human_readable_total)} \n Daily average: ${putInBackticks(user.human_readable_daily_average)}`,
            inline: false
        });
    }
    return embed;
    // Name, total time, daily average
}


exports.singleUserEmbed = singleUserEmbed;
exports.summaryEmbed = summaryEmbed;
