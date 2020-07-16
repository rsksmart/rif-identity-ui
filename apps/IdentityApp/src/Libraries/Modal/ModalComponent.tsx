import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { layoutStyles } from '../../styles';

interface ModalComponentProps {
  visible: boolean;
  children: any;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  visible,
  children,
}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={layoutStyles.container}>
          <View style={{ ...styles.modalView, ...layoutStyles.row }}>
            {children}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ModalComponent;
