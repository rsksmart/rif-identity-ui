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
  onSubmit: (text: string[]) => void;
  restoreError: string | null;
  isRestoring: boolean;
  noIdentityError: boolean;
  closeIdentityError: () => void;
  createNewItentity: (mnemonic: string[]) => void;
  strings: any;
}

const RestoreWalletComponent: React.FC<RestoreWalletComponentProps> = ({
  onSubmit,
  restoreError,
  isRestoring,
  noIdentityError,
  closeIdentityError,
  createNewItentity,
  strings,
}) => {
  const { layout, typography }: ThemeInterface = useContext(ThemeContext);
  const [textValue, setTextValue] = useState<string>('');

  // convert to lowercase, replace 2 spaces with 1, trim then split:
  const cleanSeed = (seed: string) => seed.toLowerCase().replace(/\s+/g, ' ').trim().split(' ');

  const handleRestore = () => {
    Keyboard.dismiss();
    onSubmit(cleanSeed(textValue));
  };

  const handleCreateNewIdentity = () => createNewItentity(cleanSeed(textValue));

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
            onPress={handleCreateNewIdentity}
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
