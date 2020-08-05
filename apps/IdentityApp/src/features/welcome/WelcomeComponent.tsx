import React, { useContext } from 'react';
import ThemeContext, { ThemeInterface } from '@rsksmart/rif-theme';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import { multilanguage } from 'redux-multilanguage';
import { SquareButton } from '../../Libraries/Button';

interface WelcomeComponentProps {
  restoreButtonPress: () => void | null;
  getStartedPress: () => void | null;
  strings: any;
}

const WelcomeComponent: React.FC<WelcomeComponentProps> = ({
  restoreButtonPress,
  getStartedPress,
  strings,
}) => {
  const { layout }: ThemeInterface = useContext(ThemeContext);
  return (
    <View style={[layout.container, styles.containerTop]}>
      <View style={[layout.container, styles.topContainer]}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.poweredByImage}
            source={require('../../assets/images/powered-by-rif.png')}
          />
        </View>
      </View>
      <View style={[layout.row, styles.containerMiddle]}>
        <Text style={styles.middleText}>Digital Identity Wallet</Text>
      </View>
      <View style={[layout.row, styles.containerBottom]}>
        <View style={[layout.column1]}>
          <SquareButton title={strings.get_started} variation="hollow" onPress={getStartedPress} />
        </View>
        <View style={[layout.column1]}>
          <TouchableOpacity onPress={restoreButtonPress} style={styles.restoreButton}>
            <Text style={styles.restoreText}>{strings.already_have_account}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerTop: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topContainer: {
    flex: 3,
  },
  imageContainer: {
    marginTop: '10%',
    alignItems: 'center',
  },
  poweredByImage: {
    width: 163,
    height: 34,
  },
  containerMiddle: {
    flex: 3,
  },
  middleText: {
    textAlign: 'center',
    color: '#000000',
    fontSize: 25,
    width: '100%',
  },
  containerBottom: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  restoreButton: {
    marginBottom: 10,
    width: '100%',
  },
  restoreText: {
    width: '100%',
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default multilanguage(WelcomeComponent);
