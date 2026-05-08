import AsyncStorage from '@react-native-async-storage/async-storage';

const CONVERSTION_HISTORY_KEY = 'CONVERSTION_HISTORY_KEY';

export const storeData = async (value: {
  from: string;
  to: string;
  amount: number;
  result: number;
  date: Date;
}) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(CONVERSTION_HISTORY_KEY, jsonValue);
  } catch (e) {
    // saving error
  }
};

export const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(CONVERSTION_HISTORY_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    console.log('getData error', e);
  }
};
