import React from 'react';
import {SafeAreaView} from 'react-native';
import {Provider} from 'react-redux';
import configureStore from './src/state/store';
import AppNavigation from './src/AppNavigation';

const App = () => {
  const store = configureStore();
  console.table(store.getState());

  return (
    <Provider store={store}>
      <SafeAreaView style={{'flex': 1}}>
        <AppNavigation />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
