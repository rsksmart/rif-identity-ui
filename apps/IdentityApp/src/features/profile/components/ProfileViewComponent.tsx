import React, { useContext } from 'react';
import ThemeContext, { ThemeInterface } from '@rsksmart/rif-theme';
import { multilanguage } from 'redux-multilanguage';
import { StyleSheet, ScrollView, TouchableOpacity, View, Text } from 'react-native';

import DisplayItem from './DisplayItem';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { HolderAppDeclarativeDetailsInterface } from '../operations';
import MissingMnemonic from '../../credentialsView/components/MissingMnemonic';

interface ProfileViewComponentProps {
  strings: any;
  profile: HolderAppDeclarativeDetailsInterface;
  isEmpty: boolean;
  navigation: any;
  hasIdentity: boolean;
}

const ProfileViewComponent: React.FC<ProfileViewComponentProps> = ({
  strings,
  profile,
  isEmpty,
  navigation,
  hasIdentity,
}) => {
  const { layout, typography }: ThemeInterface = useContext(ThemeContext);
  return (
    <ScrollView style={layout.container}>
      <View style={layout.row}>
        <View style={layout.column1}>
          <Text style={typography.header1}>{strings.personal_info}</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('Settings')}>
            <FontAwesome name="cog" size={25} />
          </TouchableOpacity>
          <Text style={typography.paragraph}>{strings.profile_explanation}</Text>

          {!hasIdentity && (
            <MissingMnemonic
              setUpMnemonic={() => navigation.navigate('SignupFlow', { screen: 'MnemonicView' })}
            />
          )}

          <View style={styles.viewProfile}>
            {hasIdentity && (
              <TouchableOpacity
                style={styles.editButton}
                onPress={() =>
                  navigation.navigate('CredentialsFlow', {
                    screen: 'Profile',
                    params: { screen: 'Edit' },
                  })
                }>
                <FontAwesome
                  name={isEmpty ? 'plus-circle' : 'edit'}
                  size={35}
                  color="#50555C"
                  style={styles.editIcon}
                />
              </TouchableOpacity>
            )}
            {isEmpty && (
              <Text style={[typography.paragraph, styles.empty]}>
                {strings.no_personal_details}
              </Text>
            )}
            <DisplayItem
              name={strings.fullName}
              value={profile.fullName ? profile.fullName.value : ''}
            />

            <DisplayItem
              name={strings.birthdate}
              value={
                profile.birthdate ? new Date(profile.birthdate.value).toLocaleDateString() : ''
              }
            />
            <DisplayItem
              name={strings.idNumber}
              value={profile.idNumber ? profile.idNumber.value : ''}
            />
            <DisplayItem
              name={strings.driversLicenseNumber}
              value={profile.driversLicenseNumber ? profile.driversLicenseNumber.value : ''}
            />

            <DisplayItem
              name={strings.civilStatus}
              value={profile.civilStatus ? strings[profile.civilStatus.value] : ''}
            />

            <DisplayItem
              name={strings.address}
              value={profile.address ? profile.address.value : ''}
            />
            <DisplayItem name={strings.city} value={profile.city ? profile.city.value : ''} />
            <DisplayItem name={strings.phone} value={profile.phone ? profile.phone.value : ''} />
            <DisplayItem name={strings.email} value={profile.email ? profile.email.value : ''} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  viewProfile: {
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#F0F0F0',
  },
  editButton: {
    position: 'absolute',
    right: 20,
    top: 20,
    width: 60,
    height: 60,
    zIndex: 1000,
  },
  editIcon: {
    textAlign: 'right',
  },
  empty: {
    marginRight: 30,
  },
});

export default multilanguage(ProfileViewComponent);
