require('dotenv').config();
const axios = require('axios');

const apiRequest = async (url) => {
    const options = {
        method: 'GET',
        url: url,
        headers: {
            'x-rapidapi-key': process.env.API_KEY,
            'x-rapidapi-host': process.env.API_HOST
        }
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        throw error;  
    }
};

const getMatchesByDate = async (date) => {
    const url = `https://cricket-live-data.p.rapidapi.com/fixtures-by-date/${date}`;
    const data = await apiRequest(url);
    return data.results; 
};

const getMatchDetails = async (matchId) => {
    const url = `https://cricket-live-data.p.rapidapi.com/match/${matchId}`;
    const data = await apiRequest(url);
    return data.results.live_details;  
};

const findBestBatter = (battingData) => {
   let bestBatter = battingData[0];
   for (let batter of battingData){
    if(parseInt(batter['runs']) > parseInt(bestBatter['runs'])){
        bestBatter = batter;
    }else if(parseInt(batter['runs']) === parseInt(bestBatter['runs'])){
        if(parseFloat(batter['strike_rate']) > parseFloat(bestBatter['strike_rate'])){
            bestBatter = batter;
        }
    }
   }
   return bestBatter;

}

const findBestBowler = (bowlingData) => {
    let bestBowler = bowlingData[0]; 

    for (let bowler of bowlingData) {
        if (parseInt(bowler['wickets']) > parseInt(bestBowler['wickets'])) {
            bestBowler = bowler;
        } else if (parseInt(bowler['wickets']) === parseInt(bestBowler['wickets'])) {
            if (parseFloat(bowler['economy']) < parseFloat(bestBowler['economy'])) {
                bestBowler = bowler;
            }
        }
    }

    return bestBowler; 
};

const getBestPlayerInMatch = async (matchId, index, role) => {
    try {
        const matchDetails = await getMatchDetails(matchId);

        if (!matchDetails.scorecard || !matchDetails.scorecard[index]) {
            throw new Error('Scorecard or the selected index is missing.');
        }

        let bestPlayer;

        if (role === 'bowler') {
            const bowlingData = matchDetails.scorecard[index].bowling;
            if (!bowlingData || bowlingData.length === 0) {
                throw new Error('No bowling data available for this match.');
            }
            bestPlayer = findBestBowler(bowlingData);
            console.log('Best Bowler:', bestPlayer['player_name']);
        } else if (role === 'batter') {
            const battingData = matchDetails.scorecard[index].batting;
            if (!battingData || battingData.length === 0) {
                throw new Error('No batting data available for this match.');
            }
            bestPlayer = findBestBatter(battingData);
            console.log('Best Batter:', bestPlayer['player_name']);
        } else {
            throw new Error(`Unknown role: ${role}`);
        }
    } catch (error) {
        throw error;
    }
};


const main = async (date,role,innings) => {
    try {
    const matches = await getMatchesByDate(date);
    for(let match of matches){
        try {
            await getBestPlayerInMatch(match['id'],innings, role);
        } catch (error) {
            console.log(`Sorry, no data for ${role} in match: ${match['match_title']}`);
        }
        
    }
    } catch (error) {
        console.error(`Error in fetching matches or ${role} data:`, error.message || error);
    }
    
    
};


main('2023-10-22','batter',1);


