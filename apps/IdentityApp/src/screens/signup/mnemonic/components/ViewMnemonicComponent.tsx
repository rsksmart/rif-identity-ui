import React, { useContext }  from 'react';
import ThemeContext, { ThemeInterface } from '@rsksmart/rif-theme';
import {StyleSheet, View, Text, GestureResponderEvent} from 'react-native';

import {SquareButton} from '../../../../Libraries/Button';

interface ViewMnemonicComponentProps {
  mnemonic: string[];
  onSubmit: (event: GestureResponderEvent) => void | null;
}

const ViewMnemonicComponent: React.FC<ViewMnemonicComponentProps> = ({
  mnemonic,
  onSubmit,
}) => {
  const { layout, typography }: ThemeInterface = useContext(ThemeContext);
  return (
    <>
      <View style={layout.row}>
        <View style={layout.column1}>
          <Text style={typography.paragraph}>
            Write these words down in order starting with the first row.
            Keep them safe, this is the backup to your identity.
          </Text>
        </View>
        <View
          style={[ layout.row, layout.borderRow,styles.wordRow ]}>
          {mnemonic.map((word, index) => (
            <View style={layout.column3} key={word}>
              <View style={[ layout.row, styles.innerRow]}>
                <View style={styles.circleView}>
                  <Text style={styles.circleNumber}>{index + 1}</Text>
                </View>
                <Text style={[ typography.paragraph, styles.singleWord ]}>
                  {word}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
      <View style={layout.row}>
        <View style={layout.column1}>
          <SquareButton title="Okay" onPress={onSubmit} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wordRow: {
    margin: 10,
  },
  innerRow: {
    marginTop: 10,
    marginBottom: 10,
    alignContent: 'center',
  },
  singleWord: {
    textAlign: 'center',
    width: '100%',
    marginTop: 0,
    marginBottom: 10,
  },
  circleView: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 3,
    backgroundColor: '#cccccc',
    width: 26,
    height: 26,
    borderRadius: 13,
  },
  circleNumber: {
    textAlign: 'center',
    paddingTop: 3,
  },
});

export default ViewMnemonicComponent;
