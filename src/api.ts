import { getMatchesByDate, getMatchDetails, findBestBatter, findBestBowler } from './scrapper';
import { Request, Response, NextFunction, Router } from 'express';
import redisClient from './redisClient'; 
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
    (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };

const router = Router();


const cacheMiddleware = async (key: string, fetchFunction: Function) => {
    const cachedData = await redisClient.get(key); 
    if (cachedData) {
        return JSON.parse(cachedData);
    } else {
        const newData = await fetchFunction(); 
        await redisClient.setEx(key, 3600, JSON.stringify(newData));
        return newData;
    }
};

router.get('/matches', asyncHandler(async (req: Request, res: Response) => {
    const date = req.query.date as string;

    if (!date) {
        return res.status(400).json({ error: 'Please provide a valid date in YYYY-MM-DD format.' });
    }

    const matches = await cacheMiddleware(`matches:${date}`, () => getMatchesByDate(date));
    return res.json(matches);
}));

router.get('/match/:index', asyncHandler(async (req: Request, res: Response) => {
    const date = req.query.date as string;
    const innings = req.query.innings as string;
    const role = req.query.role as string;
    const index = parseInt(req.params.index, 10);

    if (!date || !innings || !role) {
        return res.status(400).json({ error: 'Please provide valid date, innings, and role.' });
    }

    if (isNaN(index)) {
        return res.status(400).json({ error: 'Invalid match index' });
    }

    try {

        const cacheKey = `match:${date}:${index}:${innings}:${role}`;
        const data = await cacheMiddleware(cacheKey, async () => {
            const matches = await getMatchesByDate(date);
            const selectedMatch = matches[index];

            if (!selectedMatch) {
                throw new Error('Match not found');
            }

            const matchDetails = await getMatchDetails(selectedMatch.id);
            let bestPlayer;

            if (role === 'batter') {
                const battingData = matchDetails.scorecard[parseInt(innings, 10) - 1]?.batting;
                if (!battingData) {
                    throw new Error('No batting data available for this match.');
                }
                bestPlayer = findBestBatter(battingData);
            } else if (role === 'bowler') {
                const bowlingData = matchDetails.scorecard[parseInt(innings, 10) - 1]?.bowling;
                if (!bowlingData) {
                    throw new Error('No bowling data available for this match.');
                }
                bestPlayer = findBestBowler(bowlingData);
            } else {
                throw new Error('Invalid role. Please use "batter" or "bowler".');
            }

            return { match: selectedMatch, bestPlayer };
        });

        return res.json(data);
    } catch (error) {
        return res.status(500).json({ error:'Failed to fetch match details.' });
    }
}));

export default router;
