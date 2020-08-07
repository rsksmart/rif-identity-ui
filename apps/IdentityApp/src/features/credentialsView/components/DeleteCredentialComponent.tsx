import React, { useState, useContext } from 'react';
import { multilanguage } from 'redux-multilanguage';
import ThemeContext, { ThemeInterface } from '@rsksmart/rif-theme';
import { StyleSheet, View, Text } from 'react-native';
import { SquareButton } from '../../../Libraries/Button';
import ModalComponent from '../../../Libraries/Modal/ModalComponent';

interface DeleteCredentialComponentProps {
  removeCredential: () => {};
  strings: any;
}

const DeleteCredentialComponent: React.FC<DeleteCredentialComponentProps> = ({
  removeCredential,
  strings,
}) => {
  const { typography }: ThemeInterface = useContext(ThemeContext);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleClick = () => {
    setShowModal(false);
    removeCredential();
  };

  return (
    <View style={styles.buttonView}>
      <SquareButton
        title={strings.remove_credential}
        variation="hollow"
        onPress={() => setShowModal(true)}
      />
      <ModalComponent visible={showModal}>
        <View>
          <Text style={typography.paragraphBold}>{strings.are_you_sure_remove}</Text>
          <View style={styles.buttonView}>
            <SquareButton title={strings.yes} variation="hollow" onPress={() => handleClick()} />
          </View>
          <View style={styles.buttonView}>
            <SquareButton
              title={strings.no}
              variation="hollow"
              onPress={() => setShowModal(false)}
            />
          </View>
        </View>
      </ModalComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    marginTop: 10,
  },
});

export default multilanguage(DeleteCredentialComponent);
