# Currency Converter

A React Native currency converter built with Expo.

## Running locally

```bash
npm install
npm start        # open in Expo Go by scanning the QR code
npm run ios      # run on iOS simulator
npm run android  # run on Android emulator
```

Run 
```bash
cp .env.example .env # create .env based on .env.example
```

Update your EXPO_PUBLIC_CURRENCY_API_KEY from your account to be able to run the API.

## Potential improvements

- Add unit tests (Jest + React Native Testing Library)
- Add constants for colors to keep it consistent
- Clicking Swap button should swap currencies and invert the conversion
- Error detail — errors could be more precise
- Add currency search/filter in the picker for convenience
