import { StyleSheet, View } from 'react-native';
import { AmountInput } from '../AmountInput';
import { CurrencySelect } from '../CurrencySelect';
import type { Currency } from '../../types';

interface Props {
    amount: string;
    currency: string;
    currencies: Currency[];
    onAmountChange?: (value: string) => void;
    onCurrencyChange: (value: string) => void;
    amountReadOnly?: boolean;
    amountDisabled?: boolean;
    isLoading: boolean;
}

export const CurrencyField = ({
    amount,
    currency,
    currencies,
    onAmountChange,
    onCurrencyChange,
    amountReadOnly,
    amountDisabled,
    isLoading,
}: Props) => {
    return (
        <View style={styles.row}>
            <AmountInput
                value={amount}
                onChange={onAmountChange}
                readOnly={amountReadOnly}
                disabled={amountDisabled}
            />
            <CurrencySelect
                currencies={currencies}
                value={currency}
                onChange={onCurrencyChange}
                isLoading={isLoading}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
});
