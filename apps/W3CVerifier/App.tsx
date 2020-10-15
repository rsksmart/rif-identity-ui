import React from 'react';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './src/state/store';
import AppNavigation from './src/AppNavigation';
import { initialAppStart } from './src/state/operations';

const App = () => {
  const store = configureStore();

  store.dispatch(initialAppStart());

  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <AppNavigation />
      </SafeAreaView>
    </Provider>
  );
};

export default App;