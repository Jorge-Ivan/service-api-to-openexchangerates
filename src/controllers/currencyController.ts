import { Request, Response } from "express";
import OpenExchangeRatesService from "../providers/OpenExchangeRatesService";
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const openExchangeRatesService = new OpenExchangeRatesService({
    baseUrl: process.env.EXCHANGE_BASE_URL||'https://openexchangerates.org/api',
    appId: process.env.EXCHANGE_APP_ID||'',
  });

export const getAviableCurrencies = async (req: Request, res: Response) => {
    openExchangeRatesService.getCurrencies()
    .then(response => {
        res.status(200).send(response.data);
    })
    .catch(error => {
        console.error('Error fetching currencies:', error);
        res.status(400).send('Error fetching currencies');
    });
};

export const getLatestRates = async (req: Request, res: Response) => {
    const { base, symbols } = req.body;
    openExchangeRatesService.getLatestRates({base, symbols})
    .then(response => {
        res.status(200).send(response.data);
    })
    .catch(error => {
        console.error('Error fetching latest rates:', error);
        res.status(400).send('Error fetching latest rates');
    });
};

export const getHistoricalRates = async (req: Request, res: Response) => {
    const { base, symbols, date } = req.body;
    if (!date) {
        return res.status(400).json({ message: 'date Y-m-d are required' });
    }
    openExchangeRatesService.getHistoricalRates({base, symbols, date})
    .then(response => {
        res.status(200).send(response.data);
    })
    .catch(error => {
        console.error('Error fetching historical rates:', error);
        res.status(400).send('Error fetching historical rates');
    });
};

export const convertCurrency = async (req: Request, res: Response) => {
    const { base, symbols, value, from, to } = req.body;
    openExchangeRatesService.convertCurrency({base, symbols, value, from, to})
    .then(response => {
        res.status(200).send(response.data);
    })
    .catch(error => {
        console.error('Error converting currency:', error);
        res.status(400).send('Error converting currency');
    });
};

export const getUsage = async (req: Request, res: Response) => {
    openExchangeRatesService.getUsage()
    .then(response => {
        res.status(200).send(response.data);
    })
    .catch(error => {
        console.error('Error fetching usage:', error);
        res.status(400).send('Error fetching usage');
    });
};