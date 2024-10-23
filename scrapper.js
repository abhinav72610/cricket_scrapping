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
var _this = this;
require('dotenv').config();
var axios = require('axios');
var apiRequest = function (url) { return __awaiter(_this, void 0, void 0, function () {
    var options, response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                options = {
                    method: 'GET',
                    url: url,
                    headers: {
                        'x-rapidapi-key': process.env.API_KEY,
                        'x-rapidapi-host': process.env.API_HOST
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
                }
                else if (role === 'batter') {
                    battingData = matchDetails.scorecard[index].batting;
                    if (!battingData || battingData.length === 0) {
                        throw new Error('No batting data available for this match.');
                    }
                    bestPlayer = findBestBatter(battingData);
                    console.log('Best Batter:', bestPlayer['player_name']);
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
var main = function (date, role, innings) { return __awaiter(_this, void 0, void 0, function () {
    var matches, _i, matches_1, match, error_3, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 9]);
                return [4 /*yield*/, getMatchesByDate(date)];
            case 1:
                matches = _a.sent();
                _i = 0, matches_1 = matches;
                _a.label = 2;
            case 2:
                if (!(_i < matches_1.length)) return [3 /*break*/, 7];
                match = matches_1[_i];
                _a.label = 3;
            case 3:
                _a.trys.push([3, 5, , 6]);
                return [4 /*yield*/, getBestPlayerInMatch(match['id'], innings, role)];
            case 4:
                _a.sent();
                return [3 /*break*/, 6];
            case 5:
                error_3 = _a.sent();
                console.log("Sorry, no data for ".concat(role, " in match: ").concat(match['match_title']));
                return [3 /*break*/, 6];
            case 6:
                _i++;
                return [3 /*break*/, 2];
            case 7: return [3 /*break*/, 9];
            case 8:
                error_4 = _a.sent();
                console.error("Error in fetching matches or ".concat(role, " data:"), error_4.message || error_4);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
main('2023-10-22', 'batter', 1);
