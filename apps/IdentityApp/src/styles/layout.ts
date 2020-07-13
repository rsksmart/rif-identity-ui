import {StyleSheet} from 'react-native';
import colors from './colors';

// editable variables:
const gutter = 10;

// helpers:
const columnGutter = {
  paddingRight: gutter,
  paddingLeft: gutter,
  marginBottom: gutter,
};

// for development:
export const addBorder = {
  borderWidth: 1,
  borderColor: '#FFCC33',
};

const layout = StyleSheet.create({
  container: {
    flexDirection: 'column',
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

  borderRow: {
    borderColor: colors.primary,
    borderWidth: 3,
    borderRadius: 8,
  },
});

export default layout;
