import React from 'react';
import { StyleSheet, View, Image, GestureResponderEvent } from 'react-native';
import { multilanguage } from 'redux-multilanguage';

import { layoutStyles } from '../../../styles';
import { SquareButton } from '../../../Libraries/Button';
import ChangeLangaugeModalContainer from '../../Shared/ChangeLangaugeModalContainer';

interface WelcomeComponentProps {
  restoreButtonPress: (event: GestureResponderEvent) => void | null;
  getStartedPress: (event: GestureResponderEvent) => void | null;
}

const WelcomeComponent: React.FC<WelcomeComponentProps> = ({
  restoreButtonPress,
  getStartedPress,
  strings,
}) => {
  return (
    <View style={{ ...layoutStyles.container, ...styles.containerTop }}>
      <View style={{ ...layoutStyles.container, ...styles.topContainer }}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.brandingImage}
            source={require('../../../assets/images/branding-logo.png')}
          />
          <Image
            style={styles.poweredByImage}
            source={require('../../../assets/images/powered-by-rif.png')}
          />
        </View>
      </View>
      <View style={{ ...layoutStyles.row, ...styles.containerBottom }}>
        <View style={{ ...layoutStyles.column2, ...styles.buttonContainer }}>
          <SquareButton
            title={strings.restore}
            variation="hollow"
            onPress={restoreButtonPress}
          />
        </View>
        <View style={{ ...layoutStyles.column2, ...styles.buttonContainer }}>
          <SquareButton
            title={strings.get_started}
            variation="solid"
            onPress={getStartedPress}
          />
        </View>
        <View style={{ ...layoutStyles.row, ...styles.containerBottom }}>
          <ChangeLangaugeModalContainer />
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
    flex: 5,
  },
  imageContainer: {
    marginTop: '40%',
    alignItems: 'center',
  },
  brandingImage: {
    width: 163,
    height: 163,
    marginBottom: 10,
  },
  poweredByImage: {
    width: 163,
    height: 34,
  },

  containerBottom: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: '10%',
    marginRight: 10,
    marginLeft: 10,
  },
  buttonContainer: {
    justifyContent: 'flex-end',
  },
});

export default multilanguage(WelcomeComponent);
