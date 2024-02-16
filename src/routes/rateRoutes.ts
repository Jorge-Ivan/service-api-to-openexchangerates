import { Router } from 'express';
import { getAviableCurrencies, getLatestRates, getHistoricalRates, convertCurrency, getUsage } from '../controllers/currencyController';
import isAuthenticated from '../middleware/isAuthenticated';

const router = Router();

// routes service exchange rate
router.get('/aviable-currency', isAuthenticated, getAviableCurrencies);
router.get('/latest-rates', isAuthenticated, getLatestRates);
router.get('/historical-rates', isAuthenticated, getHistoricalRates);
router.get('/convert-currency', isAuthenticated, convertCurrency);
router.get('/latest-rates', isAuthenticated, getLatestRates);
router.get('/usage', isAuthenticated, getUsage);

export default router;
