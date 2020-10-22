import React, { useContext } from 'react';
import ThemeContext, { ThemeInterface } from '@rsksmart/rif-theme';
import { Modal, StyleSheet, View, Dimensions } from 'react-native';

interface ModalComponentProps {
  visible: boolean;
  children: React.ReactChild;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ visible, children }) => {
  const { layout }: ThemeInterface = useContext(ThemeContext);
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalContainer}>
          <View style={[styles.modalView, layout.row]}>{children}</View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flexDirection: 'column',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: 25,
    paddingBottom: 25,
    paddingRight: 15,
    paddingLeft: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: Math.round(Dimensions.get('window').width) - 45,
  },
});

export default ModalComponent;
