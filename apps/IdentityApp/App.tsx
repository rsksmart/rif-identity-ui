import React from 'react';
import {SafeAreaView} from 'react-native';
import {Provider} from 'react-redux';
import configureStore from './src/state/store';
import AppContainer from './src/AppContainer';

const App = () => {
  const store = configureStore();

  return (
    <Provider store={store}>
      <SafeAreaView style={{flex: 1}}>
        <AppContainer />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
