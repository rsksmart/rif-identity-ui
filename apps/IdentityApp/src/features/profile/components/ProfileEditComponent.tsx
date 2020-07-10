import React, { useState } from 'react';
import { multilanguage } from 'redux-multilanguage';
import { StyleSheet, View, Text } from 'react-native';
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
  });

  const handleChange = (field: string, value: string) => {
    setLocalProfile({
      ...localProfile,
      [field]: value,
    });
  };

  return (
    <View style={layoutStyles.container}>
      <View style={layoutStyles.row}>
        <View style={layoutStyles.column1}>
          <Text style={typeStyles.header1}>{strings.edit_personal_info}</Text>
          <EditItem
            name={strings.full_name}
            value={profile.fullName}
            onChange={async text => handleChange('fullName', text)}
          />

          <EditItem
            name={strings.birthdate}
            value={profile.birthdate}
            onChange={async text => handleChange('birthdate', text)}
          />

          <SquareButton
            title="Save!"
            onPress={() => handleSave(localProfile)}
            variation="hollow"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default multilanguage(ProfileEditComponent);
