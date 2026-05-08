import { useState } from 'react';
import { useDebounce } from '../../../hooks/useDebounce';
import { useCurrencies } from '../../../hooks/useCurrencies';
import { useConvertCurrency } from '../../../hooks/useConvertCurrency';
import { DEBOUNCE_MS, DEFAULT_FROM_CURRENCY, DEFAULT_TO_CURRENCY } from '../../../constants';

export const useCurrencyConverter = () => {
    const [amount, setAmount] = useState('');
    const [fromCurrency, setFromCurrency] = useState(DEFAULT_FROM_CURRENCY);
    const [toCurrency, setToCurrency] = useState(DEFAULT_TO_CURRENCY);

    const debouncedAmount = useDebounce(amount, DEBOUNCE_MS);

    const {
        data: currencies = [],
        isLoading: currenciesLoading,
        isError: currenciesError,
    } = useCurrencies();

    const {
        data: conversion,
        isFetching: conversionFetching,
        isError: conversionError,
    } = useConvertCurrency(debouncedAmount, fromCurrency, toCurrency);

    return {
        amount,
        setAmount,
        fromCurrency,
        setFromCurrency,
        toCurrency,
        setToCurrency,
        currencies,
        currenciesLoading,
        currenciesError,
        conversion,
        conversionFetching,
        conversionError,
    };
};
