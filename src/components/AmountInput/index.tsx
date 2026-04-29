import { Keyboard, StyleSheet, TextInput } from 'react-native';

interface Props {
    value: string;
    onChange?: (value: string) => void;
    readOnly?: boolean;
    disabled?: boolean;
}

export const AmountInput = ({ value, onChange, readOnly, disabled }: Props) => {
    return (
        <TextInput
            style={[styles.input, disabled && styles.disabled]}
            keyboardType="numeric"
            returnKeyType="done"
            value={value}
            editable={!readOnly && !disabled}
            onChangeText={onChange}
            onSubmitEditing={Keyboard.dismiss}
            placeholder="0"
            placeholderTextColor="#aaa"
        />
    );
};

const styles = StyleSheet.create({
    input: {
        flex: 1,
        fontSize: 24,
        fontWeight: '500',
        color: '#111',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 8,
        paddingHorizontal: 4,
        marginRight: 12,
    },
    disabled: {
        color: '#999',
    },
});
