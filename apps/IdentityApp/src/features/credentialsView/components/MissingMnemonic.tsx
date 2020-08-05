import React, { useContext } from 'react';
import { multilanguage } from 'redux-multilanguage';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import ThemeContext, { ThemeInterface } from '@rsksmart/rif-theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface MissingMnemonicProps {
  setUpMnemonic: () => {};
  strings: any;
}

const MissingMnemonic: React.FC<MissingMnemonicProps> = ({ setUpMnemonic, strings }) => {
  const { layout, colors, typography }: ThemeInterface = useContext(ThemeContext);

  const styles = StyleSheet.create({
    buttonContainer: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: colors.yellow,
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 10,
      paddingBottom: 10,
    },
    iconContainer: {
      flex: 1,
    },
    textContainer: {
      flex: 7,
    },
    caretContainer: {
      flex: 1,
      alignContent: 'flex-end',
    },
  });

  return (
    <View style={layout.row}>
      <View style={layout.column1}>
        <TouchableOpacity onPress={setUpMnemonic} style={styles.buttonContainer}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="shield-key-outline" size={35} color={colors.grey} />
          </View>
          <View style={styles.textContainer}>
            <Text style={typography.parahraph}>{strings.no_mnemonic_warning}</Text>
          </View>
          <View style={styles.caretContainer}>
            <FontAwesome name="caret-right" size={35} color={colors.yellow} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default multilanguage(MissingMnemonic);
