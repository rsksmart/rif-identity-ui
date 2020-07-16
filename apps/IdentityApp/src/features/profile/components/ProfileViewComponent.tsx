import React from 'react';
import { multilanguage } from 'redux-multilanguage';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  GestureResponderEvent,
} from 'react-native';
import moment from 'moment';

import { layoutStyles, typeStyles } from '../../../styles/';
import DisplayItem from './DisplayItem';

import { ProfileInterface } from '../reducer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { SquareButton } from '../../../Libraries/Button';

interface ProfileViewComponentProps {
  strings: any;
  profile: ProfileInterface;
  isEmpty: boolean;
  navigation: any;
  startOverPress: (event: GestureResponderEvent) => void | null;
  version: string;
}

const ProfileViewComponent: React.FC<ProfileViewComponentProps> = ({
  strings,
  profile,
  isEmpty,
  navigation,
  startOverPress,
  version,
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

            {isEmpty && (
              <Text style={[typeStyles.paragraph, styles.empty]}>
                {strings.no_personal_details}
              </Text>
            )}
            <DisplayItem name={strings.fullName} value={profile.fullName} />
            <DisplayItem
              name={strings.birthdate}
              value={profile.birthdate ? moment(profile.birthdate).format('MMM D YYYY') : ''}
            />
            <DisplayItem name={strings.idNumber} value={profile.idNumber} />
            <DisplayItem
              name={strings.civilStatus}
              value={profile.civilStatus ? strings[profile.civilStatus] : ''}
            />
            <DisplayItem name={strings.phone} value={profile.phone} />
            <DisplayItem name={strings.email} value={profile.email} />
          </View>
          <View style={styles.resetButton}>
            <SquareButton title="Reset entire App" variation="hollow" onPress={startOverPress} />
          </View>
          <View>
            <Text>APK Version: {version}</Text>
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
  resetButton: {
    marginTop: 50,
    marginBottom: 20,
  },
});

export default multilanguage(ProfileViewComponent);
