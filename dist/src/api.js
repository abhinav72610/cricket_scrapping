"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scrapper_1 = require("./scrapper");
const express_1 = require("express");
const redisClient_1 = __importDefault(require("./redisClient"));
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
const router = (0, express_1.Router)();
const cacheMiddleware = (key, fetchFunction) => __awaiter(void 0, void 0, void 0, function* () {
    const cachedData = yield redisClient_1.default.get(key);
    if (cachedData) {
        return JSON.parse(cachedData);
    }
    else {
        const newData = yield fetchFunction();
        yield redisClient_1.default.setEx(key, 3600, JSON.stringify(newData));
        return newData;
    }
});
router.get('/matches', asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = req.query.date;
    if (!date) {
        return res.status(400).json({ error: 'Please provide a valid date in YYYY-MM-DD format.' });
    }
    const matches = yield cacheMiddleware(`matches:${date}`, () => (0, scrapper_1.getMatchesByDate)(date));
    return res.json(matches);
})));
router.get('/match/:index', asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = req.query.date;
    const innings = req.query.innings;
    const role = req.query.role;
    const index = parseInt(req.params.index, 10);
    if (!date || !innings || !role) {
        return res.status(400).json({ error: 'Please provide valid date, innings, and role.' });
    }
    if (isNaN(index)) {
        return res.status(400).json({ error: 'Invalid match index' });
    }
    try {
        const cacheKey = `match:${date}:${index}:${innings}:${role}`;
        const data = yield cacheMiddleware(cacheKey, () => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b;
            const matches = yield (0, scrapper_1.getMatchesByDate)(date);
            const selectedMatch = matches[index];
            if (!selectedMatch) {
                throw new Error('Match not found');
            }
            const matchDetails = yield (0, scrapper_1.getMatchDetails)(selectedMatch.id);
            let bestPlayer;
            if (role === 'batter') {
                const battingData = (_a = matchDetails.scorecard[parseInt(innings, 10) - 1]) === null || _a === void 0 ? void 0 : _a.batting;
                if (!battingData) {
                    throw new Error('No batting data available for this match.');
                }
                bestPlayer = (0, scrapper_1.findBestBatter)(battingData);
            }
            else if (role === 'bowler') {
                const bowlingData = (_b = matchDetails.scorecard[parseInt(innings, 10) - 1]) === null || _b === void 0 ? void 0 : _b.bowling;
                if (!bowlingData) {
                    throw new Error('No bowling data available for this match.');
                }
                bestPlayer = (0, scrapper_1.findBestBowler)(bowlingData);
            }
            else {
                throw new Error('Invalid role. Please use "batter" or "bowler".');
            }
            return { match: selectedMatch, bestPlayer };
        }));
        return res.json(data);
    }
    catch (error) {
        return res.status(500).json({ error: 'Failed to fetch match details.' });
    }
})));
exports.default = router;
