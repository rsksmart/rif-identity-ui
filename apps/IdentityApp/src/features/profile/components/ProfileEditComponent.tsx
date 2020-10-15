import React, { useState, useContext } from 'react';
import ThemeContext, { ThemeInterface } from '@rsksmart/rif-theme';
import { multilanguage } from 'redux-multilanguage';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import DatePicker from './DatePicker';
import DropDown from './DropDown';

import EditItem from './EditItem';
import { SquareButton } from '../../../Libraries/Button';
import BackScreenComponent from '../../../Libraries/BackScreen/BackScreenComponent';
import { DeclarativeDetails } from '@rsksmart/rif-id-core/lib/reducers/declarativeDetails';

interface ProfileEditComponentProps {
  strings: any;
  profile: DeclarativeDetails;
  handleSave: (profile: any) => void | null;
}

const ProfileEditComponent: React.FC<ProfileEditComponentProps> = ({
  strings,
  profile,
  handleSave,
}) => {
  const { layout, typography }: ThemeInterface = useContext(ThemeContext);

  const [localProfile, setLocalProfile] = useState({
    fullName: profile.fullName ? profile.fullName.value : '',
    birthdate: profile.birthdate ? profile.birthdate.value : '',
    idNumber: profile.idNumber ? profile.idNumber.value : '',
    civilStatus: profile.civilStatus ? profile.civilStatus.value : '',
    phone: profile.phone ? profile.phone.value : '',
    email: profile.email ? profile.email.value : '',
    address: profile.address ? profile.address.value : '',
    city: profile.city ? profile.city.value : '',
    driversLicenseNumber: profile.driversLicenseNumber ? profile.driversLicenseNumber.value : '',
  });

  const handleChange = (field: string, value: string) => {
    setLocalProfile({
      ...localProfile,
      [field]: value,
    });
  };

  return (
    <ScrollView style={layout.container}>
      <BackScreenComponent>
        <View style={layout.row}>
          <View style={layout.column1}>
            <Text style={typography.header1}>{strings.edit_personal_info}</Text>
            <View style={styles.buttonView}>
              <SquareButton title={strings.save} onPress={() => handleSave(localProfile)} />
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

            <EditItem
              name={strings.driversLicenseNumber}
              value={localProfile.driversLicenseNumber}
              onChange={async text => handleChange('driversLicenseNumber', text)}
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
              name={strings.address}
              value={localProfile.address}
              onChange={async text => handleChange('address', text)}
            />

            <EditItem
              name={strings.city}
              value={localProfile.city}
              onChange={async text => handleChange('city', text)}
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
