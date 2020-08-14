import React, { useState, useContext } from 'react';
import { multilanguage } from 'redux-multilanguage';
import ThemeContext, { ThemeInterface } from '@rsksmart/rif-theme';
import { StyleSheet, Text, View, TextInput, Keyboard } from 'react-native';

import { SquareButton } from '../../Libraries/Button';
import BackScreenComponent from '../../Libraries/BackScreen/BackScreenComponent';
import MessageComponent from '../../Libraries/Message/MessageComponent';
import LoadingComponent from '../../Libraries/Loading/LoadingComponent';

interface RestoreWalletComponentProps {
  onSubmit: (text: string) => void;
  mnemonicError: string | null;
  isRestoring: boolean;
  isGettingDataVault: boolean;
  isGettingIpfs: boolean;
  strings: any;
}

const RestoreWalletComponent: React.FC<RestoreWalletComponentProps> = ({
  onSubmit,
  mnemonicError,
  isRestoring,
  isGettingDataVault,
  isGettingIpfs,
  strings,
}) => {
  const { layout, typography }: ThemeInterface = useContext(ThemeContext);
  const [textValue, setTextValue] = useState<string>('');

  const handleRestore = () => {
    Keyboard.dismiss();
    onSubmit(textValue);
  };

  return (
    <BackScreenComponent>
      <View style={layout.row}>
        <View style={layout.column1}>
          <Text style={typography.header1}>{strings.restore_access}</Text>
          <Text style={typography.paragraph}>{strings.restore_access_explanation}</Text>
          {mnemonicError && <MessageComponent type="ERROR" message={strings[mnemonicError]} />}
        </View>
      </View>
      <View style={layout.row}>
        <View style={layout.column1}>
          <View style={layout.borderRow}>
            <TextInput
              style={styles.textInput}
              multiline={true}
              numberOfLines={4}
              value={textValue}
              onChangeText={text => setTextValue(text)}
              autoCapitalize="none"
              placeholder={strings.enter_seed}
            />
          </View>
        </View>
      </View>
      <View style={layout.row}>
        <View style={layout.column1}>
          <SquareButton title={strings.restore} onPress={handleRestore} disabled={isRestoring} />
          {isRestoring && <LoadingComponent />}
          {isGettingDataVault && <Text>{strings.loading_hashes}</Text>}
          {isGettingIpfs && <Text>{strings.loading_ipfs}</Text>}
        </View>
      </View>
    </BackScreenComponent>
  );
};

const styles = StyleSheet.create({
  textInput: {
    textAlignVertical: 'top',
  },
});

export default multilanguage(RestoreWalletComponent);
