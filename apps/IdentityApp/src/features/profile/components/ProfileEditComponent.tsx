import React, { useState } from 'react';
import { multilanguage } from 'redux-multilanguage';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import DatePicker from './DatePicker';
import DropDown from './DropDown';

import { layoutStyles, typeStyles } from '../../../styles/';
import EditItem from './EditItem';
import { SquareButton } from '../../../Libraries/Button';
import { ProfileInterface } from '../reducer';
import BackScreenComponent from '../../../Libraries/BackScreen/BackScreenComponent';

interface ProfileEditComponentProps {
  strings: any;
  profile: ProfileInterface;
  handleSave: (profile: any) => void | null;
  navigation: any;
}

const ProfileEditComponent: React.FC<ProfileEditComponentProps> = ({
  strings,
  profile,
  handleSave,
  navigation,
}) => {
  const [localProfile, setLocalProfile] = useState({
    fullName: profile.fullName,
    birthdate: profile.birthdate,
    idNumber: profile.idNumber,
    civilStatus: profile.civilStatus,
    phone: profile.phone,
    email: profile.email,
  });

  const handleChange = (field: string, value: string) => {
    setLocalProfile({
      ...localProfile,
      [field]: value,
    });
  };

  const handleSavePress = () => {
    navigation.navigate('View');
    handleSave(localProfile);
  };

  return (
    <ScrollView style={layoutStyles.container}>
      <BackScreenComponent>
        <View style={layoutStyles.row}>
          <View style={layoutStyles.column1}>
            <Text style={typeStyles.header1}>{strings.edit_personal_info}</Text>
            <View style={styles.buttonView}>
              <SquareButton title={strings.save} onPress={handleSavePress} />
            </View>
            <EditItem
              name={strings.fullName}
              value={localProfile.fullName}
              onChange={async text => handleChange('fullName', text)}
            />

            <DatePicker
              name={strings.birthdate}
              value={localProfile.birthdate}
              onChange={(text: string) => handleChange('birthdate', text)}
            />

            <EditItem
              name={strings.idNumber}
              value={localProfile.idNumber}
              onChange={async text => handleChange('idNumber', text)}
              keyboardType="number-pad"
            />

            <DropDown
              name={strings.civilStatus}
              value={localProfile.civilStatus}
              items={[
                { label: '', value: '' },
                { label: strings.married, value: 'married' },
                { label: strings.single, value: 'single' },
              ]}
              onChange={async text => handleChange('civilStatus', text)}
            />

            <EditItem
              name={strings.phone}
              value={localProfile.phone}
              onChange={async text => handleChange('phone', text)}
              keyboardType="phone-pad"
            />

            <EditItem
              name={strings.email}
              value={localProfile.email}
              onChange={async text => handleChange('email', text)}
              keyboardType="email-address"
            />
          </View>
        </View>
      </BackScreenComponent>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    width: '30%',
    marginTop: 10,
    marginBottom: 10,
  },
});

export default multilanguage(ProfileEditComponent);
