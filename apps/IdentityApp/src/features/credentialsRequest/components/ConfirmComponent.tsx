import React from 'react';
import { multilanguage } from 'redux-multilanguage';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { layoutStyles, typeStyles } from '../../../styles';
import { SquareButton } from '../../../Libraries/Button';
import BackScreenComponent from '../../../Libraries/BackScreen/BackScreenComponent';
import { ProfileInterface } from '../../../features/profile/reducer';
import { CredentialTypes } from '../../credentialsView/reducer';
import LoadingComponent from '../../../screens/Shared/LoadingComponent';

interface RequestTypeComponentProps {
  route: {
    params: {
      type: CredentialTypes;
    };
  };
  profile: ProfileInterface;
  requirements: [];
  requestCredential: (metadata: []) => {};
  strings: any;
  did: string;
  isRequestingCredential: boolean;
  requestCredentialError: string | null;
}

const RequestTypeComponent: React.FC<RequestTypeComponentProps> = ({
  strings,
  route,
  profile,
  requirements,
  did,
  requestCredential,
  isRequestingCredential,
  requestCredentialError,
}) => {
  const handlePress = () => {
    let metaData = { type: type, did: did };
    requirements[type].forEach(item => {
      metaData[item] = profile[item];
    });

    requestCredential(metaData);
  };
  const type: string = route.params.type;

  const meetsRequirements = () => {
    const results = requirements[type].filter(
      (item: string) => profile[item] === '' || profile[item] === null,
    );
    return results.length === 0;
  };

  const requiredItem = (item: string) => {
    const itemValue = profile[item];
    const icon =
      itemValue === '' || !itemValue ? (
        <MaterialCommunityIcons name="close" size={20} color="#BD0000" />
      ) : (
        <MaterialCommunityIcons name="check" size={20} color="#008000" />
      );

    return (
      <Text style={styles.required} key={item}>
        {icon} {strings[item]} : {itemValue}
      </Text>
    );
  };

  return (
    <ScrollView style={layoutStyles.container}>
      <BackScreenComponent>
        <View style={layoutStyles.row}>
          <View style={layoutStyles.column1}>
            <Text style={typeStyles.header1}>{strings.confirm_request}</Text>
            <Text style={typeStyles.paragraph}>{strings.confirm_sharing}</Text>

            <View style={styles.grayBox}>
              <Text style={typeStyles.header1}>{strings[type.toLowerCase()]}</Text>
              <Text style={[typeStyles.paragraph, typeStyles.bold]}>
                {strings.information_requested}:
              </Text>

              {requirements[type].map((item: string) => requiredItem(item))}

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
