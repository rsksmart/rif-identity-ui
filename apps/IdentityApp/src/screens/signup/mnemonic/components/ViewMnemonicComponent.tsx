import React from 'react';
import {StyleSheet, View, Text, GestureResponderEvent} from 'react-native';

import {SquareButton} from '../../../../Libraries/Button';
import {layoutStyles, typeStyles} from '../../../../styles';

interface ViewMnemonicComponentProps {
  mnemonic: string[];
  onSubmit: (event: GestureResponderEvent) => void | null;
}

const ViewMnemonicComponent: React.FC<ViewMnemonicComponentProps> = ({
  mnemonic,
  onSubmit,
}) => {
  console.log(mnemonic);
  return (
    <>
      <View style={layoutStyles.row}>
        <View style={layoutStyles.column1}>
          <Text style={typeStyles.paragraph}>
            Write these words down in order starting with the first row.
            Keep them safe, this is the backup to your identity.
          </Text>
        </View>
        <View
          style={{
            ...layoutStyles.row,
            ...layoutStyles.borderRow,
            ...styles.wordRow,
          }}>
          {mnemonic.map((word, index) => (
            <View style={layoutStyles.column3} key={word}>
              <View style={{...layoutStyles.row, ...styles.innerRow}}>
                <View style={styles.circleView}>
                  <Text style={styles.circleNumber}>{index+1}</Text>
                </View>
                <Text style={{...typeStyles.paragraph, ...styles.singleWord}}>
                  {word}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
      <View style={layoutStyles.row}>
        <View style={layoutStyles.column1}>
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
  },
  singleWord: {
    textAlign: 'center',
    marginTop: 0,
    marginBottom: 10,
  },
  circleView: {
    marginTop: 3,
    marginRight: 5,
    backgroundColor: '#cccccc',
    width: 26,
    height: 26,
    borderRadius: 13,
    alignContent: 'center',
    textAlign: 'center',
  },
  circleNumber: {
    textAlign: 'center',
    paddingTop: 3,
  },
});

export default ViewMnemonicComponent;
