import React, { useContext } from 'react';
import ThemeContext, { ThemeInterface } from '@rsksmart/rif-theme';
import { multilanguage } from 'redux-multilanguage';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { SquareButton } from '../../../Libraries/Button';
import BackScreenComponent from '../../../Libraries/BackScreen/BackScreenComponent';
import { ProfileInterface } from '../../../features/profile/reducer';
import { CredentialTypes } from '../../credentialsView/reducer';
import LoadingComponent from '../../../screens/Shared/LoadingComponent';
import { declarativeDetails, credentialTypes } from '../../../Providers/Issuers';

interface RequestTypeComponentProps {
  route: {
    params: {
      type: CredentialTypes;
      requirements: declarativeDetails[];
    };
  };
  profile: ProfileInterface;
  requirements: [];
  requestCredential: (metadata: []) => {};
  strings: any;
  isRequestingCredential: boolean;
  requestCredentialError: string | null;
}

const RequestTypeComponent: React.FC<RequestTypeComponentProps> = ({
  strings,
  profile,
  requestCredential,
  isRequestingCredential,
  requestCredentialError,
  route,
}) => {
  const { layout, typography, colors }: ThemeInterface = useContext(ThemeContext);

  const handlePress = () => {
    let metaData = { type: type };
    requirements.forEach((item: declarativeDetails) => {
      metaData[item.toLowerCase()] = profile[item];
    });

    requestCredential(metaData);
  };

  const { type, requirements }: { type: credentialTypes; requirements: declarativeDetails[] } = route.params;
  // const requirements = route.params.requirements;

  const meetsRequirements = () => {
    const results = requirements.filter(
      (item: string) => profile[item] === '' || profile[item] === null,
    );
    return results.length === 0;
  };

  const requiredItem = (item: declarativeDetails) => {
    const itemValue = profile[item];
    const icon =
      itemValue === '' || !itemValue ? (
        <MaterialCommunityIcons name="close" size={20} color={colors.red} />
      ) : (
        <MaterialCommunityIcons name="check" size={20} color={colors.green} />
      );

    return (
      <Text style={styles.required} key={item}>
        {icon} {strings[item.toLowerCase()]} : {itemValue}
      </Text>
    );
  };

  return (
    <ScrollView style={layout.container}>
      <BackScreenComponent>
        <View style={layout.row}>
          <View style={layout.column1}>
            <Text style={typography.header1}>{strings.confirm_request}</Text>
            <Text style={typography.paragraph}>{strings.confirm_sharing}</Text>

            <View style={styles.grayBox}>
              <Text style={typography.header1}>{strings[type.toLowerCase()]}</Text>
              <Text style={typography.paragraphBold}>
                {strings.information_requested}:
              </Text>

              {requirements.map((item: string) => requiredItem(item))}

              <Text style={styles.notice}>
                <MaterialCommunityIcons
                  name="shield-key-outline"
                  size={20}
                  color="#919191"
                  style={styles.icon}
                />
                {strings.private_sending_notice}
              </Text>
            </View>
            {!meetsRequirements() && (
              <Text style={styles.warning}>{strings.missing_requirements}</Text>
            )}

            {requestCredentialError && <Text style={styles.warning}>{requestCredentialError}</Text>}

            {isRequestingCredential && <LoadingComponent />}
            <SquareButton
              title={strings.confirm}
              onPress={handlePress}
              disabled={!meetsRequirements() || isRequestingCredential}
            />
          </View>
        </View>
      </BackScreenComponent>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  grayBox: {
    marginTop: 10,
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#F0F0F0',
  },
  required: {
    fontSize: 15,
    color: '#50555C',
  },
  notice: {
    marginTop: 50,
    textAlign: 'right',
    color: '#919191',
    fontSize: 13,
  },
  icon: {
    paddingTop: 15,
  },
  warning: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default multilanguage(RequestTypeComponent);
