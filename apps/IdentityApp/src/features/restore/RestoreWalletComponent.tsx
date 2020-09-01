import React, { useState, useContext } from 'react';
import { multilanguage } from 'redux-multilanguage';
import ThemeContext, { ThemeInterface } from '@rsksmart/rif-theme';
import { StyleSheet, Text, View, TextInput, Keyboard } from 'react-native';

import { SquareButton } from '../../Libraries/Button';
import BackScreenComponent from '../../Libraries/BackScreen/BackScreenComponent';
import MessageComponent from '../../Libraries/Message/MessageComponent';
import LoadingComponent from '../../Libraries/Loading/LoadingComponent';
import ModalComponent from '../../Libraries/Modal/ModalComponent';

interface RestoreWalletComponentProps {
  onSubmit: (text: string) => void;
  restoreError: string | null;
  isRestoring: boolean;
  isGettingDataVault: boolean;
  isGettingIpfs: boolean;
  noIdentityError: boolean;
  closeIdentityError: () => void;
  createNewItentity: () => void;
  strings: any;
}

const RestoreWalletComponent: React.FC<RestoreWalletComponentProps> = ({
  onSubmit,
  restoreError,
  isRestoring,
  isGettingDataVault,
  isGettingIpfs,
  noIdentityError,
  closeIdentityError,
  createNewItentity,
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
          {restoreError && (
            <MessageComponent
              type="ERROR"
              message={strings[restoreError] ? strings[restoreError] : restoreError}
            />
          )}
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
      <ModalComponent visible={noIdentityError}>
        <View>
          <Text style={typography.header2}>{strings.warning}</Text>
          <Text style={typography.paragraph}>{strings.no_identity_explanation}</Text>
          <View style={styles.firstButton}>
            <SquareButton title={strings.check_mnemonic} onPress={closeIdentityError} />
          </View>
          <SquareButton
            title={strings.create_new_identity}
            variation="hollow"
            onPress={createNewItentity}
          />
        </View>
      </ModalComponent>
    </BackScreenComponent>
  );
};

const styles = StyleSheet.create({
  textInput: {
    textAlignVertical: 'top',
  },
  firstButton: {
    marginTop: 10,
    marginBottom: 10,
  },
});

export default multilanguage(RestoreWalletComponent);
