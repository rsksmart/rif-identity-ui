import {StyleSheet} from 'react-native';
import colors from './colors';

const typeMargin = {
  marginBottom: 10,
  marginTop: 70,
};

const styles = StyleSheet.create({
  header1: {
    ...typeMargin,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 30,
    lineHeight: 35,
    display: 'flex',
    alignItems: 'center',
    letterSpacing: -0.015,
    color: colors.typography.primary,
  },
  header2: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 15,
    lineHeight: 18,
    color: colors.typography.primary,
  },
  header3: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 18,
    color: colors.typography.primary,
  },
  paragraph: {
    fontSize: 18,
  },
  bold: {
    fontWeight: 'bold',
  },
  error: {
    fontSize: 20,
    backgroundColor: '#cc0000',
    color: '#fff',
    padding: 10,
    textAlign: 'center',
    borderRadius: 8,
  },
});

export default styles;
