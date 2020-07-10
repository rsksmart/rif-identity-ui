import React from 'react';
import { multilanguage } from 'redux-multilanguage';
import { StyleSheet, View, Text, GestureResponderEvent } from 'react-native';
import { layoutStyles, typeStyles } from '../../../styles/';
import DisplayItem from './DisplayItem';
import { SquareButton } from '../../../Libraries/Button';

interface ProfileViewComponentProps {
  strings: any;
  fullName: string;
  handleEdit: (event: GestureResponderEvent) => void | null;
}

const ProfileViewComponent: React.FC<ProfileViewComponentProps> = ({
  strings,
  fullName,
  handleEdit,
}) => {
  return (
    <View style={layoutStyles.container}>
      <View style={layoutStyles.row}>
        <View style={layoutStyles.column1}>
          <Text style={typeStyles.header1}>{strings.personal_info}</Text>
          <Text style={typeStyles.paragraph}>
            {strings.profile_explanation}
          </Text>

          <View style={styles.viewProfile}>
            <DisplayItem name={strings.full_name} value={fullName} />
          </View>

          <SquareButton title="Edit" onPress={handleEdit} variation="hollow" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewProfile: {
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#ccc',
  },
});

export default multilanguage(ProfileViewComponent);
