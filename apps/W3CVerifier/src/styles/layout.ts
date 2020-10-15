import { StyleSheet } from 'react-native';
import colors from './colors';

// editable variables:
const gutter = 20;

// helpers:
const columnGutter = {
  paddingRight: gutter,
  paddingLeft: gutter,
  marginBottom: gutter,
};

const layout = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  column1: {
    width: '100%',
    ...columnGutter,
  },
  column2: {
    width: '50%',
    ...columnGutter,
  },
  column3: {
    width: 100 / 3 + '%',
    ...columnGutter,
  },
});

export default layout;
