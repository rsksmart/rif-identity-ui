import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Credential } from '../reducer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface SingleSummaryComponentProps {
  credential: Credential;
  onPress: (action: string) => {};
}

const SingleSummaryComponent: React.FC<SingleSummaryComponentProps> = ({
  credential, onPress,
}) => {
  const icon = () => {
    switch (credential.type) {
      case 'AUTO':
        return <FontAwesome name="automobile" color="#50555C" size={30} />;
      case 'PASSPORT':
        return <FontAwesome5 name="passport" color="#50555C" size={30} />;
      case 'ID':
        return <FontAwesome name="id-card-o" color="#50555C" size={30} />;
      default:
        return <FontAwesome name="question" color="#50555C" size={30} />;
    }
  };

  const status = () => {
    switch (credential.status) {
      case 'CERTIFIED':
        return <Ionicons name="checkmark-circle-outline" size={30} color="#008FF7" />;
      case 'PENDING':
        return <Ionicons name="time-outline" size={30} color="#FFB800" />;
      case 'DENIED':
        return <Ionicons name="close-circle-outline" size={30} color="#BD0000" />;
      default:
        return <FontAwesome name="question" size={15} />;
    }
  };

  const showQR = credential.status === 'CERTIFIED';

  return (
    <View style={styles.credential}>
      <TouchableOpacity style={styles.detailsTouch} onPress={() => onPress('DETAILS')}>
        {icon()}
        <Text style={styles.name}>{credential.name}</Text>
        {status()}
      </TouchableOpacity>
      <View style={styles.qr}>
        <TouchableOpacity disabled={!showQR} style={styles.qrTouch} onPress={() => onPress('QR')}>
          <FontAwesome name="qrcode" size={30} color={showQR ? '#50555C' : '#CCCCCC'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  credential: {
    borderColor: '#919191',
    borderWidth: 1,
    borderRadius: 10,
    paddingTop: 20,
    paddingBottom: 10,
  },
  detailsTouch: {
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
  },
  qrTouch: {
    width: '100%',
    alignItems: 'center',
  },
  qr: {
    width: '100%',
    borderTopColor: '#919191',
    borderTopWidth: 1,
    marginTop: 10,
    paddingTop: 10,
  },
});

export default SingleSummaryComponent;
