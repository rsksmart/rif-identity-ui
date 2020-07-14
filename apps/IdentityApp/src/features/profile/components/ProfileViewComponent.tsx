import React from 'react';
import { multilanguage } from 'redux-multilanguage';
import { StyleSheet, ScrollView, TouchableOpacity, View, Text } from 'react-native';
import moment from 'moment';

import { layoutStyles, typeStyles } from '../../../styles/';
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
  return (
    <ScrollView style={layoutStyles.container}>
      <View style={layoutStyles.row}>
        <View style={layoutStyles.column1}>
          <Text style={typeStyles.header1}>{strings.personal_info}</Text>
          <Text style={typeStyles.paragraph}>{strings.profile_explanation}</Text>

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

            {isEmpty && <Text style={typeStyles.paragraph}>{strings.no_personal_details}</Text>}
            <DisplayItem name={strings.full_name} value={profile.fullName} />
            <DisplayItem
              name={strings.birthdate}
              value={profile.birthdate ? moment(profile.birthdate).format('MMM D YYYY') : ''}
            />
            <DisplayItem name={strings.id_number} value={profile.idNumber} />
            <DisplayItem
              name={strings.civilStatus}
              value={profile.civilStatus ? strings[profile.civilStatus] : ''}
            />
            <DisplayItem name={strings.phone} value={profile.phone} />
            <DisplayItem name={strings.email} value={profile.email} />
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
  }
});

export default multilanguage(ProfileViewComponent);
