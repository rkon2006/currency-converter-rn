import { useQuery } from '@tanstack/react-query';
import { fetchSupportedCurrencies } from '../api/currencies';
import { CURRENCIES_STALE_TIME } from '../constants';

export const useCurrencies = () => {
    return useQuery({
        queryKey: ['currencies'],
        queryFn: ({ signal }) => fetchSupportedCurrencies(signal),
        staleTime: CURRENCIES_STALE_TIME,
    });
};
