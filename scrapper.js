var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _this = this;
require('dotenv').config();
var axios = require('axios');
var API_KEY = '38eccc586dmsh38417244bd40a33p16e7acjsn5ced01b0cffa';
var API_HOST = 'cricket-live-data.p.rapidapi.com';
var apiRequest = function (url) { return __awaiter(_this, void 0, void 0, function () {
    var options, response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                options = {
                    method: 'GET',
                    url: url,
                    headers: {
                        'x-rapidapi-key': API_KEY,
                        'x-rapidapi-host': API_HOST
                    }
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, axios.request(options)];
            case 2:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 3:
                error_1 = _a.sent();
                console.error("Error fetching data from ".concat(url, ":"), error_1);
                throw error_1;
            case 4: return [2 /*return*/];
        }
    });
}); };
var getMatchesByDate = function (date) { return __awaiter(_this, void 0, void 0, function () {
    var url, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = "https://cricket-live-data.p.rapidapi.com/fixtures-by-date/".concat(date);
                return [4 /*yield*/, apiRequest(url)];
            case 1:
                data = _a.sent();
                return [2 /*return*/, data.results];
        }
    });
}); };
var getMatchDetails = function (matchId) { return __awaiter(_this, void 0, void 0, function () {
    var url, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = "https://cricket-live-data.p.rapidapi.com/match/".concat(matchId);
                return [4 /*yield*/, apiRequest(url)];
            case 1:
                data = _a.sent();
                return [2 /*return*/, data.results.live_details];
        }
    });
}); };
var findBestBatter = function (battingData) {
    var bestBatter = battingData[0];
    for (var _i = 0, battingData_1 = battingData; _i < battingData_1.length; _i++) {
        var batter = battingData_1[_i];
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
var findBestBowler = function (bowlingData) {
    var bestBowler = bowlingData[0];
    for (var _i = 0, bowlingData_1 = bowlingData; _i < bowlingData_1.length; _i++) {
        var bowler = bowlingData_1[_i];
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
var getBestPlayerInMatch = function (matchId, index, role) { return __awaiter(_this, void 0, void 0, function () {
    var matchDetails, bestPlayer, bowlingData, battingData, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, getMatchDetails(matchId)];
            case 1:
                matchDetails = _a.sent();
                if (!matchDetails.scorecard || !matchDetails.scorecard[index]) {
                    throw new Error('Scorecard or the selected index is missing.');
                }
                bestPlayer = void 0;
                if (role === 'bowler') {
                    bowlingData = matchDetails.scorecard[index].bowling;
                    if (!bowlingData || bowlingData.length === 0) {
                        throw new Error('No bowling data available for this match.');
                    }
                    bestPlayer = findBestBowler(bowlingData);
                    console.log('Best Bowler:', bestPlayer['player_name']);
                    return [2 /*return*/, { role: 'bowler', player: bestPlayer['player_name'], details: bestPlayer }];
                }
                else if (role === 'batter') {
                    battingData = matchDetails.scorecard[index].batting;
                    if (!battingData || battingData.length === 0) {
                        throw new Error('No batting data available for this match.');
                    }
                    bestPlayer = findBestBatter(battingData);
                    console.log('Best Batter:', bestPlayer['player_name']);
                    return [2 /*return*/, { role: 'batter', player: bestPlayer['player_name'], details: bestPlayer }];
                }
                else {
                    throw new Error("Unknown role: ".concat(role));
                }
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                throw error_2;
            case 3: return [2 /*return*/];
        }
    });
}); };
var main = function (date_1, role_1, innings_1) {
    var args_1 = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        args_1[_i - 3] = arguments[_i];
    }
    return __awaiter(_this, __spreadArray([date_1, role_1, innings_1], args_1, true), void 0, function (date, role, innings, matchIndex) {
        var matches, selectedMatch, bestPlayer, error_3;
        if (matchIndex === void 0) { matchIndex = 0; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, getMatchesByDate(date)];
                case 1:
                    matches = _a.sent();
                    if (matches.length === 0) {
                        console.log("No matches found for ".concat(date));
                        return [2 /*return*/];
                    }
                    console.log("Matches on ".concat(date, ":"));
                    matches.forEach(function (match, index) {
                        console.log("".concat(index, ": ").concat(match.match_title));
                    });
                    selectedMatch = matches[matchIndex];
                    console.log("Fetching details for match: ".concat(selectedMatch.match_title));
                    return [4 /*yield*/, getBestPlayerInMatch(selectedMatch.id, innings, role)];
                case 2:
                    bestPlayer = _a.sent();
                    console.log("Best ".concat(bestPlayer.role, ": ").concat(bestPlayer.player), bestPlayer.details);
                    return [2 /*return*/, bestPlayer];
                case 3:
                    error_3 = _a.sent();
                    console.error("Error in fetching matches or ".concat(role, " data:"), error_3.message || error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
main('2023-10-22', 'batter', 1, 7);
