import { useState } from 'react';
import { Dimensions, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import type { Currency } from '../../types';
import { useCurrencySelect } from './hooks/useCurrencySelect';

interface Props {
    currencies: Currency[];
    value: string;
    onChange: (value: string) => void;
    isLoading: boolean;
}

export const CurrencySelect = ({ currencies, value, onChange, isLoading }: Props) => {
    const {
        open,
        pending,
        handleCancel,
        handleDone,
        handleOpen,
        setPending,
    } = useCurrencySelect({ onChange, value });

    if (isLoading) {
        return <Text style={styles.loading}>Loading...</Text>;
    }

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity style={styles.select} onPress={handleOpen} activeOpacity={0.7}>
                <Text style={styles.selectText} numberOfLines={1}>{value}</Text>
                <Text style={styles.chevron}>▾</Text>
            </TouchableOpacity>

            <Modal visible={open} transparent animationType="slide">
                <View style={styles.overlay}>
                    <Pressable style={styles.backdrop} onPress={handleCancel} />
                    <View style={styles.sheet}>
                        <View style={styles.sheetHeader}>
                            <TouchableOpacity onPress={handleCancel}>
                                <Text style={styles.cancel}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleDone}>
                                <Text style={styles.done}>Done</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.pickerWrapper}>
                            <Picker
                                style={styles.pickerWrapper}
                                selectedValue={pending}
                                onValueChange={setPending}
                            >
                                {currencies.map((c) => (
                                    <Picker.Item
                                        key={c.short_code}
                                        label={`${c.short_code} – ${c.name}`}
                                        value={c.short_code}
                                    />
                                ))}
                            </Picker>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const SHEET_HEIGHT = Dimensions.get('window').height * 0.5;
const HEADER_HEIGHT = 53; // paddingTop 12 + paddingBottom 4 + fontSize 16 + hairline border

const styles = StyleSheet.create({
    wrapper: {
        flex: 0,
    },
    select: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: '#fff',
        minWidth: 90,
        maxWidth: 120,
    },
    selectText: {
        flex: 1,
        fontSize: 14,
        color: '#111',
        marginRight: 4,
    },
    chevron: {
        fontSize: 12,
        color: '#555',
    },
    loading: {
        fontSize: 14,
        color: '#999',
    },
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    sheet: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        height: '50%',
    },
    pickerWrapper: {
        flex: 1,
        height: SHEET_HEIGHT - HEADER_HEIGHT,
    },
    sheetHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 4,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e0e0e0',
    },
    cancel: {
        fontSize: 16,
        color: '#888',
    },
    done: {
        fontSize: 16,
        color: '#007AFF',
        fontWeight: '600',
    },
});
