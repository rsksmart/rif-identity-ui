import React from 'react';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './src/state/store';
import AppNavigation from './src/AppNavigation';
import { initialAppStart } from './src/state/operations';
import { RifThemeProvider, defaultTheme } from '@rsksmart/rif-theme';

const App = () => {
  const store = configureStore();

  store.dispatch(initialAppStart());

  // override initial styles here:
  const theme = {
    ...defaultTheme,
    name: 'OVERRIDE!'
  }

  return (
    <Provider store={store}>
      <RifThemeProvider value={theme}>
        <SafeAreaView style={{ flex: 1 }}>
          <AppNavigation />
        </SafeAreaView>
      </RifThemeProvider>
    </Provider>
  );
};

export default App;
