import {StyleSheet} from 'react-native';
import colors from './colors';

const typeMargin = {
  marginBottom: 10,
  marginTop: 10,
};

const styles = StyleSheet.create({
  header1: {
    ...typeMargin,
    fontSize: 45,
    color: colors.typography.primary,
  },
  header2: {
    ...typeMargin,
    fontSize: 35,
    color: colors.typography.primary,
  },
  paragraph: {
    ...typeMargin,
    fontSize: 20,
  },
  bold: {
    fontWeight: 'bold',
  },
  error: {
    ...typeMargin,
    fontSize: 20,
    backgroundColor: '#cc0000',
    color: '#fff',
    padding: 10,
    textAlign: 'center',
    borderRadius: 8,
  },
});

export default styles;
