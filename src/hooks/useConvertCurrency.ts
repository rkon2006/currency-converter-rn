import { useQuery } from '@tanstack/react-query';
import { convertCurrency } from '../api/currencies';

export const useConvertCurrency = (amount: string, from: string, to: string) => {
    return useQuery({
        queryKey: ['convert', from, to, amount],
        queryFn: ({ signal }) => convertCurrency(from, to, Number(amount), signal),
        enabled: Boolean(from && to && amount && Number(amount) > 0),
    });
};
