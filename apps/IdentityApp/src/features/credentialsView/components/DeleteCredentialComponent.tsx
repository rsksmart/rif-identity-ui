import React, { useState, useContext } from 'react';
import { multilanguage } from 'redux-multilanguage';
import ThemeContext, { ThemeInterface } from '@rsksmart/rif-theme';
import { StyleSheet, View, Text } from 'react-native';
import { SquareButton } from '../../../Libraries/Button';
import ModalComponent from '../../../Libraries/Modal/ModalComponent';
import LoadingComponent from '../../../Libraries/Loading/LoadingComponent';

interface DeleteCredentialComponentProps {
  removeCredential: () => Promise<any>;
  strings: any;
}

const DeleteCredentialComponent: React.FC<DeleteCredentialComponentProps> = ({
  removeCredential,
  strings,
}) => {
  const { typography }: ThemeInterface = useContext(ThemeContext);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = () => {
    setIsLoading(true);
    removeCredential().then((result: boolean) => {
      if (result) {
        setShowModal(false);
      }
      setIsLoading(false);
    });
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
            <SquareButton
              title={strings.yes}
              variation="hollow"
              onPress={handleClick}
              disabled={isLoading}
            />
          </View>
          <View style={styles.buttonView}>
            <SquareButton
              title={strings.no}
              variation="hollow"
              onPress={() => setShowModal(false)}
              disabled={isLoading}
            />
          </View>
          {isLoading && <LoadingComponent />}
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
