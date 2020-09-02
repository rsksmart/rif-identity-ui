import React from 'react';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './src/state/store';
import AppNavigation from './src/AppNavigation';
import { initialAppStart } from './src/state/operations';
import { RifThemeProvider, defaultTheme } from '@rsksmart/rif-theme';
// import { connection } from './src/daf/dafSetup';
// import { Connection } from 'typeorm';
const App = () => {
  const store = configureStore();
  store.dispatch(initialAppStart());
/*
  connection.then((dbconn: Connection) => {
    console.log('dropping db');
    dbconn.dropDatabase();
  })
*/
  return (
    <Provider store={store}>
      <RifThemeProvider value={defaultTheme}>
        <SafeAreaView style={{ flex: 1 }}>
          <AppNavigation />
        </SafeAreaView>
      </RifThemeProvider>
    </Provider>
  );
};

export default App;
