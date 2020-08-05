import React, { useContext }  from 'react';
import ThemeContext, { ThemeInterface } from '@rsksmart/rif-theme';
import { multilanguage } from 'redux-multilanguage';
import { StyleSheet, ScrollView, TouchableOpacity, View, Text } from 'react-native';
import moment from 'moment';

import DisplayItem from './DisplayItem';
import { ProfileInterface } from '../reducer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface ProfileViewComponentProps {
  strings: any;
  profile: ProfileInterface;
  isEmpty: boolean;
  navigation: any;
}

const ProfileViewComponent: React.FC<ProfileViewComponentProps> = ({
  strings,
  profile,
  isEmpty,
  navigation,
}) => {
  const { layout, typography }: ThemeInterface = useContext(ThemeContext);
  return (
    <ScrollView style={layout.container}>
      <View style={layout.row}>
        <View style={layout.column1}>
          <Text style={typography.header1}>{strings.personal_info}</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('Settings', {})}>
            <FontAwesome name="cog" size={25} />
          </TouchableOpacity>
          <Text style={typography.paragraph}>{strings.profile_explanation}</Text>

          <View style={styles.viewProfile}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => navigation.navigate('Edit', {})}>
              <FontAwesome
                name={isEmpty ? 'plus-circle' : 'edit'}
                size={35}
                color="#50555C"
                style={styles.editIcon}
              />
            </TouchableOpacity>

            {isEmpty && (
              <Text style={[typography.paragraph, styles.empty]}>
                {strings.no_personal_details}
              </Text>
            )}
            <DisplayItem name={strings.full_name} value={profile.FULL_NAME} />
            <DisplayItem
              name={strings.birthdate}
              value={profile.BIRTHDATE ? moment(profile.BIRTHDATE).format('MMM D YYYY') : ''}
            />
            <DisplayItem name={strings.id_number} value={profile.ID_NUMBER} />
            <DisplayItem name={strings.drivers_license_number} value={profile.DRIVERS_LICENSE_NUMBER} />

            <DisplayItem
              name={strings.civil_status}
              value={profile.CIVIL_STATUS ? strings[profile.CIVIL_STATUS] : ''}
            />
            
            <DisplayItem name={strings.address} value={profile.ADDRESS} />
            <DisplayItem name={strings.city} value={profile.CITY} />
            <DisplayItem name={strings.phone} value={profile.PHONE} />
            <DisplayItem name={strings.email} value={profile.EMAIL} />
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
