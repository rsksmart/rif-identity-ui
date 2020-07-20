import React from 'react';
import { CredentialStatus } from '../reducer';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface StatusIconProps {
  status: CredentialStatus | string;
}

const StatusIcon: React.FC<StatusIconProps> = ({ status }) => {
  switch (status) {
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

export default StatusIcon;
