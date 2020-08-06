import React, { useContext } from 'react';
import ThemeContext, { ThemeInterface } from '@rsksmart/rif-theme';
import { StyleSheet, View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface MessageComponentProps {
  type: 'WARNING' | 'ERROR';
  message: string;
}

const MessageComponent: React.FC<MessageComponentProps> = ({ type, message }) => {
  const { layout, typography, colors }: ThemeInterface = useContext(ThemeContext);
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: type === 'WARNING' ? colors.yellow : colors.red,
      paddingTop: 5,
      paddingBottom: 5,
      paddingRight: 10,
      paddingLeft: 10,
    },
    iconContainer: {
      flex: 1,
      alignItems: 'center',
      alignSelf: 'center',
    },
    messageContainer: {
      flex: 5,
    },
  });

  const icon = () => {
    if (type === 'WARNING') {
      return <Ionicons name="information-circle-outline" size={40} color={colors.yellow} />;
    }
    return <Ionicons name="close-circle-outline" size={40} color={colors.red} />;
  };

  return (
    <View style={layout.row}>
      <View style={layout.column1}>
        <View style={styles.container}>
          <View style={styles.iconContainer}>{icon()}</View>
          <View style={styles.messageContainer}>
            <Text style={typography.paragraph}>{message}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MessageComponent;
