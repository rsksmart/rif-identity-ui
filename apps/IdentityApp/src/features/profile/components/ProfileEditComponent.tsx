import React, { useState } from 'react';
import { multilanguage } from 'redux-multilanguage';
import { StyleSheet, View, Text } from 'react-native';
import { layoutStyles, typeStyles } from '../../../styles/';
import EditItem from './EditItem';
import { SquareButton } from '../../../Libraries/Button';

interface ProfileEditComponentProps {
  strings: any;
  fullName: string;
  handleSave: (profile: any) => void | null;
}

const ProfileEditComponent: React.FC<ProfileEditComponentProps> = ({
  strings,
  fullName,
  handleSave,
}) => {
  const [profile, setProfile] = useState({
    fullName: fullName,
  });

  const handleChange = (field: string, value: string) => {
    setProfile({
      ...profile,
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

          <SquareButton
            title="Save!"
            onPress={() => handleSave(profile)}
            variation="hollow"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default multilanguage(ProfileEditComponent);
