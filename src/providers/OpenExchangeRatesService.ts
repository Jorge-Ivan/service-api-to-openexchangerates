import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { pick } from 'lodash';

interface OpenExchangeRatesConfig {
  baseUrl: string;
  appId: string;
}

interface OpenExchangeRatesParameters {
    base?: string,
    symbols?: string,
    show_alternative?: boolean
}

class OpenExchangeRatesService {
  private config: OpenExchangeRatesConfig;

  constructor(config: OpenExchangeRatesConfig) {
    this.config = config;
  }

  async getLatestRates(params?:OpenExchangeRatesParameters): Promise<AxiosResponse<any>> {
    const url = `${this.config.baseUrl}/latest.json`;
    const config:AxiosRequestConfig = {
        params: {
            prettyprint:0,
            app_id: this.config.appId,
            ...(params?this.getParamsDefaultOpenExchangeRates(params):[])
        }
    };
    return axios.get(url, config);
  }

  async getCurrencies(): Promise<AxiosResponse<any>> {
    const url = `${this.config.baseUrl}/currencies.json`;
    const config:AxiosRequestConfig = {
        params: {
            prettyprint:0,
            app_id: this.config.appId
        }
    };
    return axios.get(url, config);
  }

  async getHistoricalRates(params:OpenExchangeRatesParameters & { date: string }): Promise<AxiosResponse<any>> {
    const url = `${this.config.baseUrl}/historical/${params.date}.json`;
    const config:AxiosRequestConfig = {
        params: {
            prettyprint:0,
            app_id: this.config.appId,
            ...(params?this.getParamsDefaultOpenExchangeRates(params):[])
        }
    };
    return axios.get(url, config);
  }

  async convertCurrency(params:OpenExchangeRatesParameters & {value: number, from: string, to: string}): Promise<AxiosResponse<any>> {
    const url = `${this.config.baseUrl}/convert/${params.value}/${params.from}/${params.to}`;
    const config:AxiosRequestConfig = {
        params: {
            prettyprint:0,
            app_id: this.config.appId,
            ...(params?this.getParamsDefaultOpenExchangeRates(params):[])
        }
    };
    return axios.get(url, config);
  }

  async getUsage(): Promise<AxiosResponse<any>> {
    const url = `${this.config.baseUrl}/usage.json`;
    const config:AxiosRequestConfig = {
        params: {
            prettyprint:0,
            app_id: this.config.appId
        }
    };
    return axios.get(url, config);
  }

  private getParamsDefaultOpenExchangeRates(params: OpenExchangeRatesParameters): any {
    const keysOfInterface = Object.keys(params as OpenExchangeRatesParameters);
    const defaultParams = pick(params, keysOfInterface);
    console.info(params, keysOfInterface, defaultParams);
    return defaultParams;
}
}

export default OpenExchangeRatesService;