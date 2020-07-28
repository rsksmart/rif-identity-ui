import React, { useContext } from 'react';
import ThemeContext, { ThemeInterface } from '@rsksmart/rif-theme';
import { CredentialStatus } from '../reducer';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface StatusIconProps {
  status: CredentialStatus | string;
}

const StatusIcon: React.FC<StatusIconProps> = ({ status }) => {
  const { colors }: ThemeInterface = useContext(ThemeContext);
  switch (status) {
    case 'CERTIFIED':
      return <Ionicons name="checkmark-circle-outline" size={30} color={colors.blue} />;
    case 'PENDING':
      return <Ionicons name="time-outline" size={30} color={colors.yellow} />;
    case 'DENIED':
      return <Ionicons name="close-circle-outline" size={30} color={colors.red} />;
    default:
      return <FontAwesome name="question" size={15} />;
  }
};

export default StatusIcon;
