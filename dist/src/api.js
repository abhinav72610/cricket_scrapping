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
Object.defineProperty(exports, "__esModule", { value: true });
const scrapper_1 = require("./scrapper");
const express_1 = require("express");
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
const router = (0, express_1.Router)();
router.get('/matches', asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = req.query.date;
    if (!date) {
        return res.status(400).json({ error: 'Please provide a valid date in YYYY-MM-DD format.' });
    }
    const matches = yield (0, scrapper_1.getMatchesByDate)(date);
    return res.json(matches);
})));
router.get('/match/:index', asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
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
        const matches = yield (0, scrapper_1.getMatchesByDate)(date);
        const selectedMatch = matches[index]; // Get match by index
        if (!selectedMatch) {
            return res.status(404).json({ error: 'Match not found' });
        }
        const matchDetails = yield (0, scrapper_1.getMatchDetails)(selectedMatch.id);
        let bestPlayer;
        if (role === 'batter') {
            const battingData = (_a = matchDetails.scorecard[parseInt(innings, 10)]) === null || _a === void 0 ? void 0 : _a.batting;
            if (!battingData) {
                return res.status(404).json({ error: 'No batting data available for this match.' });
            }
            bestPlayer = (0, scrapper_1.findBestBatter)(battingData);
        }
        else if (role === 'bowler') {
            const bowlingData = (_b = matchDetails.scorecard[parseInt(innings, 10)]) === null || _b === void 0 ? void 0 : _b.bowling;
            if (!bowlingData) {
                return res.status(404).json({ error: 'No bowling data available for this match.' });
            }
            bestPlayer = (0, scrapper_1.findBestBowler)(bowlingData);
        }
        else {
            return res.status(400).json({ error: 'Invalid role. Please use "batter" or "bowler".' });
        }
        return res.json({ match: selectedMatch, bestPlayer });
    }
    catch (error) {
        return res.status(500).json({ error: 'Failed to fetch match details.' });
    }
})));
exports.default = router;
