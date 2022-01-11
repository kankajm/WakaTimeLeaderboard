const axios = require('axios');

async function getLeaderboard() {
    const response = await axios({
        method: 'get',
        url: 'https://wakatime.com/api/v1/users/current/leaderboards/0dff005b-968c-4881-b275-77c792f888b9',
        auth: {
            username: '',
            password: process.env.WAKATIME_API_KEY
        },
    });
    let leaderboardRaw = response.data.data;

    return leaderboardRaw.map(user => {
        return {
            rank: user.rank,
            daily_average: user.running_total.daily_average,
            human_readable_total: user.running_total.human_readable_total,
            human_readable_daily_average: user.running_total.human_readable_daily_average,
            languages: user.running_total.languages,
            total_seconds: user.running_total.total_seconds,
            username: user.user.username,
            display_name: user.user.display_name,
            avatar: user.user.photo,
            city: user.user.city,
        }
    });
}

exports.getLeaderboard = getLeaderboard;