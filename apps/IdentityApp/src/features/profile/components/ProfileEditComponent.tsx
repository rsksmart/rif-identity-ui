import React, { useState } from 'react';
import { multilanguage } from 'redux-multilanguage';
import { ScrollView, View, Text } from 'react-native';
import DatePicker from './DatePicker';
import DropDown from './DropDown';

import { layoutStyles, typeStyles } from '../../../styles/';
import EditItem from './EditItem';
import { SquareButton } from '../../../Libraries/Button';
import { ProfileInterface } from '../reducer';

interface ProfileEditComponentProps {
  strings: any;
  profile: ProfileInterface;
  handleSave: (profile: any) => void | null;
}

const ProfileEditComponent: React.FC<ProfileEditComponentProps> = ({
  strings,
  profile,
  handleSave,
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

  console.log(localProfile);

  return (
    <ScrollView style={layoutStyles.container}>
      <View style={layoutStyles.row}>
        <View style={layoutStyles.column1}>
          <Text style={typeStyles.header1}>{strings.edit_personal_info}</Text>
          <EditItem
            name={strings.full_name}
            value={localProfile.fullName}
            onChange={async text => handleChange('fullName', text)}
          />

          <DatePicker
            name={strings.birthdate}
            value={localProfile.birthdate}
            onChange={(text: string) => {
              return handleChange('birthdate', text);
            }}
          />

          <EditItem
            name={strings.id_number}
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
          />

          <EditItem
            name={strings.email}
            value={localProfile.email}
            onChange={async text => handleChange('email', text)}
          />

          <View style={{ marginTop: 15 }}>
            <SquareButton
              title={strings.save}
              onPress={() => handleSave(localProfile)}
              variation="hollow"
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default multilanguage(ProfileEditComponent);
