import React from 'react';
import { multilanguage } from 'redux-multilanguage';
import { StyleSheet, ScrollView, View, Text, GestureResponderEvent } from 'react-native';
import moment from 'moment';

import { layoutStyles, typeStyles } from '../../../styles/';
import DisplayItem from './DisplayItem';
import { SquareButton } from '../../../Libraries/Button';
import { ProfileInterface } from '../reducer';

interface ProfileViewComponentProps {
  strings: any;
  profile: ProfileInterface;
  handleEdit: (event: GestureResponderEvent) => void | null;
}

const ProfileViewComponent: React.FC<ProfileViewComponentProps> = ({
  strings,
  profile,
  handleEdit,
}) => {
  return (
    <ScrollView style={layoutStyles.container}>
      <View style={layoutStyles.row}>
        <View style={layoutStyles.column1}>
          <Text style={typeStyles.header1}>{strings.personal_info}</Text>
          <Text style={typeStyles.paragraph}>{strings.profile_explanation}</Text>

          <View style={styles.viewProfile}>
            <DisplayItem name={strings.full_name} value={profile.fullName} />
            <DisplayItem
              name={strings.birthdate}
              value={profile.birthdate ? moment(profile.birthdate).format('MMM D YYYY') : ''}
            />
            <DisplayItem name={strings.id_number} value={profile.idNumber} />
            <DisplayItem name={strings.civilStatus} value={profile.civilStatus} />
            <DisplayItem name={strings.phone} value={profile.phone} />
            <DisplayItem name={strings.email} value={profile.email} />
          </View>

          <SquareButton title={strings.edit} onPress={handleEdit} variation="hollow" />
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
});

export default multilanguage(ProfileViewComponent);
