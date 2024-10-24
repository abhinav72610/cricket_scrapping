"use strict";
// require('dotenv').config();
// const axios = require('axios');
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findBestBowler = exports.findBestBatter = exports.getMatchDetails = exports.getMatchesByDate = void 0;
// const API_KEY = '38eccc586dmsh38417244bd40a33p16e7acjsn5ced01b0cffa';
// const API_HOST = 'cricket-live-data.p.rapidapi.com';
// const apiRequest = async (url) => {
//     const options = {
//         method: 'GET',
//         url: url,
//         headers: {
//             'x-rapidapi-key': API_KEY,
//             'x-rapidapi-host': API_HOST
//         }
//     };
//     try {
//         const response = await axios.request(options);
//         return response.data;
//     } catch (error) {
//         console.error(`Error fetching data from ${url}:`, error);
//         throw error;  
//     }
// };
// const getMatchesByDate = async (date) => {
//     const url = `https://cricket-live-data.p.rapidapi.com/fixtures-by-date/${date}`;
//     const data = await apiRequest(url);
//     return data.results; 
// };
// const getMatchDetails = async (matchId) => {
//     const url = `https://cricket-live-data.p.rapidapi.com/match/${matchId}`;
//     const data = await apiRequest(url);
//     return data.results.live_details;  
// };
// const findBestBatter = (battingData) => {
//    let bestBatter = battingData[0];
//    for (let batter of battingData){
//     if(parseInt(batter['runs']) > parseInt(bestBatter['runs'])){
//         bestBatter = batter;
//     }else if(parseInt(batter['runs']) === parseInt(bestBatter['runs'])){
//         if(parseFloat(batter['strike_rate']) > parseFloat(bestBatter['strike_rate'])){
//             bestBatter = batter;
//         }
//     }
//    }
//    return bestBatter;
// }
// const findBestBowler = (bowlingData) => {
//     let bestBowler = bowlingData[0]; 
//     for (let bowler of bowlingData) {
//         if (parseInt(bowler['wickets']) > parseInt(bestBowler['wickets'])) {
//             bestBowler = bowler;
//         } else if (parseInt(bowler['wickets']) === parseInt(bestBowler['wickets'])) {
//             if (parseFloat(bowler['economy']) < parseFloat(bestBowler['economy'])) {
//                 bestBowler = bowler;
//             }
//         }
//     }
//     return bestBowler; 
// };
// const getBestPlayerInMatch = async (matchId, index, role) => {
//     try {
//         const matchDetails = await getMatchDetails(matchId);
//         if (!matchDetails.scorecard || !matchDetails.scorecard[index]) {
//             throw new Error('Scorecard or the selected index is missing.');
//         }
//         let bestPlayer;
//         if (role === 'bowler') {
//             const bowlingData = matchDetails.scorecard[index].bowling;
//             if (!bowlingData || bowlingData.length === 0) {
//                 throw new Error('No bowling data available for this match.');
//             }
//             bestPlayer = findBestBowler(bowlingData);
//             console.log('Best Bowler:', bestPlayer['player_name']);
//             return { role: 'bowler', player: bestPlayer['player_name'], details: bestPlayer };
//         } else if (role === 'batter') {
//             const battingData = matchDetails.scorecard[index].batting;
//             if (!battingData || battingData.length === 0) {
//                 throw new Error('No batting data available for this match.');
//             }
//             bestPlayer = findBestBatter(battingData);
//             console.log('Best Batter:', bestPlayer['player_name']);
//             return { role: 'batter', player: bestPlayer['player_name'], details: bestPlayer };
//         } else {
//             throw new Error(`Unknown role: ${role}`);
//         }
//     } catch (error) {
//         throw error;
//     }
// };
// const main = async (date, role, innings, matchIndex = 0) => {
//     try {
//         const matches = await getMatchesByDate(date);
//         if (matches.length === 0) {
//             console.log(`No matches found for ${date}`);
//             return;
//         }
//         console.log(`Matches on ${date}:`);
//         matches.forEach((match, index) => {
//             console.log(`${index}: ${match.match_title}`);
//         });
//         const selectedMatch = matches[matchIndex];
//         console.log(`Fetching details for match: ${selectedMatch.match_title}`);
//         const bestPlayer = await getBestPlayerInMatch(selectedMatch.id, innings, role);
//         console.log(`Best ${bestPlayer.role}: ${bestPlayer.player}`, bestPlayer.details);
//         return bestPlayer;
//     } catch (error) {
//         console.error(`Error in fetching matches or ${role} data:`, error.message || error);
//     }
// };
// main('2023-10-22','batter',1,7);
require('dotenv').config();
const axios = require('axios');
const API_KEY = '38eccc586dmsh38417244bd40a33p16e7acjsn5ced01b0cffa';
const API_HOST = 'cricket-live-data.p.rapidapi.com';
const apiRequest = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        method: 'GET',
        url: url,
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': API_HOST
        }
    };
    try {
        const response = yield axios.request(options);
        return response.data;
    }
    catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        throw error;
    }
});
const getMatchesByDate = (date) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `https://cricket-live-data.p.rapidapi.com/fixtures-by-date/${date}`;
    const data = yield apiRequest(url);
    return data.results;
});
exports.getMatchesByDate = getMatchesByDate;
const getMatchDetails = (matchId) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `https://cricket-live-data.p.rapidapi.com/match/${matchId}`;
    const data = yield apiRequest(url);
    return data.results.live_details;
});
exports.getMatchDetails = getMatchDetails;
const findBestBatter = (battingData) => {
    let bestBatter = battingData[0];
    for (let batter of battingData) {
        if (parseInt(batter['runs']) > parseInt(bestBatter['runs'])) {
            bestBatter = batter;
        }
        else if (parseInt(batter['runs']) === parseInt(bestBatter['runs'])) {
            if (parseFloat(batter['strike_rate']) > parseFloat(bestBatter['strike_rate'])) {
                bestBatter = batter;
            }
        }
    }
    return bestBatter;
};
exports.findBestBatter = findBestBatter;
const findBestBowler = (bowlingData) => {
    let bestBowler = bowlingData[0];
    for (let bowler of bowlingData) {
        if (parseInt(bowler['wickets']) > parseInt(bestBowler['wickets'])) {
            bestBowler = bowler;
        }
        else if (parseInt(bowler['wickets']) === parseInt(bestBowler['wickets'])) {
            if (parseFloat(bowler['economy']) < parseFloat(bestBowler['economy'])) {
                bestBowler = bowler;
            }
        }
    }
    return bestBowler;
};
exports.findBestBowler = findBestBowler;
