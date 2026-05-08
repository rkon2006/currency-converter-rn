import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useCurrencyConverter } from './hooks/useCurrencyConverter';
import { CurrencyField } from '../CurrencyField';
import { storeData, getData } from '../../api/asycn-storage';

const useConversionHistory = () => {
  const [history, setHistory] = useState([]);
  const readHistory = async () => {
    const savedHistory = await getData();

    console.log('savedHistory', savedHistory);
  };

  const updateHistory = async (data: {
    from: string;
    to: string;
    amount: number;
    result: number;
  }) => {
    const model = {
      ...data,
      date: new Date(),
    };

    let existingHistory = [];

    try {
      existingHistory = (await getData()) ?? [];
    } catch (e) {
      existingHistory = [];
      1;
    }

    // TODO: make 5 an env var
    if (existingHistory.length === 5) {
      existingHistory = existingHistory.slice(1);
    }

    try {
      console.log('update 5', existingHistory);

      existingHistory.push(model);
      await storeData(existingHistory);
      setHistory(existingHistory.slice());
    } catch (e) {
      console.log('update 6', e);
    }

    console.log('update 7', existingHistory);
  };

  useEffect(() => {
    readHistory();
  }, []);

  return {
    history,
    updateHistory,
    readHistory,
  };
};

export const CurrencyConverter = () => {
  const { history, updateHistory } = useConversionHistory();

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
    () => currencies?.find((c) => c.short_code === toCurrency)?.precision ?? 4,
    [currencies, toCurrency],
  );
  const conversionResult = conversion?.result.toFixed(toCurrencyPrecision) ?? '';
  console.log(conversion);

  useEffect(() => {
    if (conversionResult) {
      updateHistory({
        from: fromCurrency,
        to: toCurrency,
        amount: parseFloat(amount),
        result: parseFloat(conversionResult),
      });
    }
  }, [conversionResult, amount]);

  if (currenciesError) {
    return <Text style={styles.error}>Failed to load currencies. Please try again.</Text>;
  }

  return (
    <View style={styles.container}>
      <View>
        {history.map((h) => {
          return (
            <Text key={h.date}>
              from: {h.amount} {h.from} / {h.result} {h.to}
            </Text>
          );
        })}
      </View>
      <Button
        title="Click"
        onPress={() => updateHistory({ from: 'USD', to: 'EUR', amount: 10, result: 12 })}
      />

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
      {conversionError && <Text style={styles.error}>Failed to convert. Please try again.</Text>}
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
