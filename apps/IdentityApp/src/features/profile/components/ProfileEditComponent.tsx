import React, { useState, useContext }  from 'react';
import ThemeContext, { ThemeInterface } from '@rsksmart/rif-theme';
import { multilanguage } from 'redux-multilanguage';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import DatePicker from './DatePicker';
import DropDown from './DropDown';

import EditItem from './EditItem';
import { SquareButton } from '../../../Libraries/Button';
import { ProfileInterface } from '../reducer';
import BackScreenComponent from '../../../Libraries/BackScreen/BackScreenComponent';
import { declarativeDetails } from '../../../Providers/Issuers';

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
  const { layout, typography }: ThemeInterface = useContext(ThemeContext);

  const [localProfile, setLocalProfile] = useState<ProfileInterface>({
    FULL_NAME: profile.FULL_NAME,
    BIRTHDATE: profile.BIRTHDATE,
    ID_NUMBER: profile.ID_NUMBER,
    CIVIL_STATUS: profile.CIVIL_STATUS,
    PHONE: profile.PHONE,
    EMAIL: profile.EMAIL,
    ADDRESS: profile.ADDRESS,
    CITY: profile.CITY,
  });

  const handleChange = (field: declarativeDetails, value: string) => {
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
    <ScrollView style={layout.container}>
      <BackScreenComponent>
        <View style={layout.row}>
          <View style={layout.column1}>
            <Text style={typography.header1}>{strings.edit_personal_info}</Text>
            <View style={styles.buttonView}>
              <SquareButton title={strings.save} onPress={handleSavePress} />
            </View>
            <EditItem
              name={strings.full_name}
              value={localProfile.FULL_NAME}
              onChange={async text => handleChange(declarativeDetails.FULL_NAME, text)}
            />

            <DatePicker
              name={strings.birthdate}
              value={localProfile.BIRTHDATE}
              onChange={(text: string) => handleChange(declarativeDetails.BIRTHDATE, text)}
            />

            <EditItem
              name={strings.id_number}
              value={localProfile.ID_NUMBER}
              onChange={async text => handleChange(declarativeDetails.ID_NUMBER, text)}
              keyboardType="number-pad"
            />

            <DropDown
              name={strings.civil_status}
              value={localProfile.CIVIL_STATUS}
              items={[
                { label: '', value: '' },
                { label: strings.married, value: 'married' },
                { label: strings.single, value: 'single' },
              ]}
              onChange={async text => handleChange(declarativeDetails.CIVIL_STATUS, text)}
            />

            <EditItem
              name={strings.address}
              value={localProfile.ADDRESS}
              onChange={async text => handleChange(declarativeDetails.ADDRESS, text)}
            />

            <EditItem
              name={strings.city}
              value={localProfile.CITY}
              onChange={async text => handleChange(declarativeDetails.CITY, text)}
            />

            <EditItem
              name={strings.phone}
              value={localProfile.PHONE}
              onChange={async text => handleChange(declarativeDetails.PHONE, text)}
              keyboardType="phone-pad"
            />

            <EditItem
              name={strings.email}
              value={localProfile.EMAIL}
              onChange={async text => handleChange(declarativeDetails.EMAIL, text)}
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
