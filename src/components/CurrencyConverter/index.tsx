import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useCurrencyConverter } from './hooks/useCurrencyConverter';
import { CurrencyField } from '../CurrencyField';

export const CurrencyConverter = () => {
    const {
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
    } = useCurrencyConverter();

    const toCurrencyPrecision = useMemo(
        () => currencies?.find(c => c.short_code === toCurrency)?.precision ?? 4,
        [currencies, toCurrency],
    );
    const conversionResult = conversion?.result.toFixed(toCurrencyPrecision) ?? '';

    if (currenciesError) {
        return <Text style={styles.error}>Failed to load currencies. Please try again.</Text>;
    }

    return (
        <View style={styles.container}>
            <CurrencyField
                amount={amount}
                currency={fromCurrency}
                currencies={currencies}
                onAmountChange={setAmount}
                onCurrencyChange={setFromCurrency}
                isLoading={currenciesLoading}
            />
            <Text style={styles.swap}>⇄</Text>
            <CurrencyField
                amount={conversionResult}
                currency={toCurrency}
                currencies={currencies}
                onCurrencyChange={setToCurrency}
                amountReadOnly
                amountDisabled={conversionFetching}
                isLoading={currenciesLoading}
            />
            {conversionError && (
                <Text style={styles.error}>Failed to convert. Please try again.</Text>
            )}
            {conversion && (
                <Text style={styles.rate}>
                    1 {fromCurrency} = {conversion.rate.toFixed(toCurrencyPrecision)} {toCurrency}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 24,
    },
    swap: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 24,
        color: '#555',
    },
    error: {
        color: '#c00',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 8,
    },
    rate: {
        fontSize: 14,
        color: '#555',
        textAlign: 'center',
        marginTop: 8,
    },
});
