import { getMatchesByDate, getMatchDetails, findBestBatter, findBestBowler } from './scrapper';
import { Request, Response, NextFunction,Router } from 'express';

const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => 
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

  const router = Router();


router.get('/matches', asyncHandler(async (req: Request, res: Response) => {
    const date = req.query.date as string;

    if (!date) {
        return res.status(400).json({ error: 'Please provide a valid date in YYYY-MM-DD format.' });
    }

    const matches = await getMatchesByDate(date);
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
        const matches = await getMatchesByDate(date);
        const selectedMatch = matches[index];  

        if (!selectedMatch) {
            return res.status(404).json({ error: 'Match not found' });
        }

        const matchDetails = await getMatchDetails(selectedMatch.id);
        let bestPlayer;

        if (role === 'batter') {
            const battingData = matchDetails.scorecard[parseInt(innings, 10)]?.batting; 
            if (!battingData) {
                return res.status(404).json({ error: 'No batting data available for this match.' });
            }
            bestPlayer = findBestBatter(battingData);
        } else if (role === 'bowler') {
            const bowlingData = matchDetails.scorecard[parseInt(innings, 10)]?.bowling;
            if (!bowlingData) {
                return res.status(404).json({ error: 'No bowling data available for this match.' });
            }
            bestPlayer = findBestBowler(bowlingData);
        } else {
            return res.status(400).json({ error: 'Invalid role. Please use "batter" or "bowler".' });
        }

        return res.json({ match: selectedMatch, bestPlayer });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch match details.' });
    }
}));


export default router;
