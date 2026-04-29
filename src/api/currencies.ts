import type { Currency, ConvertResult } from '../types';

const BASE_URL = 'https://api.currencybeacon.com/v1';
const API_KEY = process.env.EXPO_PUBLIC_CURRENCY_API_KEY;

interface CurrenciesResponse {
    response: { short_code: string; name: string }[];
}

interface ConvertResponse {
    response: {
        amount: number;
        value: number;
    };
}

export const fetchSupportedCurrencies = async (
    signal?: AbortSignal,
): Promise<Currency[]> => {
    const response = await fetch(`${BASE_URL}/currencies?api_key=${API_KEY}`, {
        signal,
    });

    if (!response.ok)
        throw new Error(`Failed to fetch currencies: ${response.status}`);

    const data: CurrenciesResponse = await response.json();

    return data.response;
};

export const convertCurrency = async (
    from: string,
    to: string,
    amount: number,
    signal?: AbortSignal,
): Promise<ConvertResult> => {
    const response = await fetch(
        `${BASE_URL}/convert?api_key=${API_KEY}&from=${from}&to=${to}&amount=${amount}`,
        { signal },
    );

    if (!response.ok)
        throw new Error(`Failed to convert currency: ${response.status}`);

    const data: ConvertResponse = await response.json();

    return {
        amount: data.response.amount,
        rate: data.response.value / data.response.amount,
        result: data.response.value,
    };
};
