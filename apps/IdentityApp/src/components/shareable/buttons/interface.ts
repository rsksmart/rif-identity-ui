import {GestureResponderEvent} from 'react-native';

interface StyleInterface {
  button: Object;
  text: Object;
}

export interface ButtonInterface {
  title: string;
  style?: StyleInterface;
  onPress?: (event: GestureResponderEvent) => void | null;
  disabled?: boolean;
}
