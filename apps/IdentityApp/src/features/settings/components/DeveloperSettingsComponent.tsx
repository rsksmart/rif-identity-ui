import React, { useContext, useState } from 'react';
import ThemeContext, { ThemeInterface } from '@rsksmart/rif-theme';
import { multilanguage } from 'redux-multilanguage';
import { StyleSheet, ScrollView, View, Text, GestureResponderEvent } from 'react-native';
import BackScreenComponent from '../../../Libraries/BackScreen/BackScreenComponent';
import { EndpointsInterface } from '../reducer';
import { SquareButton } from '../../../Libraries/Button';
import EditItem from '../../profile/components/EditItem';

interface DeveloperSettingsComponentProps {
  endpoints: EndpointsInterface;
  version: string;
  strings: any;
  startOverPress: (event: GestureResponderEvent) => void;
  saveEndpoints: (endpoints: EndpointsInterface) => void;
  isSavingEndpoints: boolean;
}

const DeveloperSettingsComponent: React.FC<DeveloperSettingsComponentProps> = ({
  endpoints,
  version,
  strings,
  startOverPress,
  saveEndpoints,
  isSavingEndpoints,
}) => {
  const { layout, typography }: ThemeInterface = useContext(ThemeContext);
  const [newEndpoints, setNewEndpoints] = useState<EndpointsInterface>(endpoints);
  const handleChange = (field: string, value: string) => {
    setNewEndpoints({
      ...newEndpoints,
      [field]: value,
    });
  };

  return (
    <ScrollView style={layout.container}>
      <BackScreenComponent>
        <View style={layout.row}>
          <View style={layout.column1}>
            <Text style={typography.header1}>{strings.developer_settings}</Text>
            <Text style={typography.paragraphBold}>{strings.version}</Text>
            <Text style={typography.paragraph}>{version}</Text>

            <Text style={typography.header2}>{strings.edit_endpionts}:</Text>
            <EditItem
              name={strings.issuer}
              value={newEndpoints.issuer}
              onChange={async text => handleChange('issuer', text)}
            />
            <EditItem
              name={strings.tiny_qr}
              value={newEndpoints.tinyQr}
              onChange={async text => handleChange('tinyQr', text)}
            />
            <EditItem
              name={strings.ipfs_gateway}
              value={newEndpoints.ipfs}
              onChange={async text => handleChange('ipfs', text)}
            />
            <EditItem
              name={strings.data_vault}
              value={newEndpoints.dataVault}
              onChange={async text => handleChange('dataVault', text)}
            />
            <EditItem
              name={strings.rsk_node}
              value={newEndpoints.rskNode}
              onChange={async text => handleChange('rskNode', text)}
            />
            <View style={styles.buttonView}>
              <SquareButton
                title={strings.save}
                variation="hollow"
                onPress={() => saveEndpoints(newEndpoints)}
                disabled={isSavingEndpoints}
              />
            </View>

            <Text style={typography.header2}>{strings.danger}</Text>
            <View style={styles.buttonView}>
              <SquareButton title={strings.reset_app} variation="hollow" onPress={startOverPress} />
            </View>
          </View>
        </View>
      </BackScreenComponent>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  endpoints: {
    borderColor: '#999999',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  buttonView: {
    marginTop: 15,
    marginBottom: 15,
  },
});

export default multilanguage(DeveloperSettingsComponent);
