import React, { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { multilanguage } from 'redux-multilanguage';
import ThemeContext, { ThemeInterface } from '@rsksmart/rif-theme';
import BaseCopy from './BaseCopy';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface CopyButtonProps {
  value: string;
  text?: string;
  color?: string;
  strings: any;
}

const CopyButton: React.FC<CopyButtonProps> = ({ value, text, color, strings }) => {
  const { typography, colors }: ThemeInterface = useContext(ThemeContext);
  const textIconColor = color ? color : colors.primary;
  return (
    <BaseCopy value={value} prompt={strings.copied}>
      <View style={styles.copyContainer}>
        <View style={styles.copyText}>
          <Text style={[typography.paragraph, { color: textIconColor }]}>
            {text ? text : value}
          </Text>
        </View>
        <View style={styles.copyIcon}>
          <FontAwesome name="copy" size={30} color={textIconColor} />
        </View>
      </View>
    </BaseCopy>
  );
};

const styles = StyleSheet.create({
  copyContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  copyIcon: {
    flex: 1,
    alignSelf: 'center',
  },
  copyText: {
    flex: 6,
    paddingRight: 5,
  },
});

export default multilanguage(CopyButton);
