import { StyleSheet } from 'react-native'
import colors from './colors'
 
export default StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 180,
    height: 80,
    backgroundColor: colors.lightGray,
  },
  text: {
    fontSize: 14,
    color: colors.black,
  },
});