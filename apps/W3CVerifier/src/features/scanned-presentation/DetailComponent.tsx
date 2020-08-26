import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { VerifiedPresentation } from '../../api'
import { ScrollView } from 'react-native-gesture-handler';
import { colors } from '../../styles';
import moment from 'moment';

interface PresentationDetailProps {
  presentation: VerifiedPresentation;
  strings: any
}

const PresentationDetail: React.FC<PresentationDetailProps> = ({
  presentation,
  strings,
}) => {
  const styles = StyleSheet.create({
    table: {
      height: 100
    },
    row: {
      alignSelf: 'stretch',
      flexDirection: 'row'
    },
    cell: { 
      alignSelf: 'stretch',
      width: 100,
    },
    valueText: {
      color: colors.gray4,
      fontWeight: '500',
      fontSize: 10,
      lineHeight: 18,
    },
    labelText: {
      color: colors.gray3,
      fontWeight: '500',
      fontSize: 10,
      lineHeight: 18,
    },
  })

  const metadata = presentation.credentialDetails?.credentialSubject

  const DataRow: React.FC<{label: string; value: string}> = ({
    label,
    value,
  }) => {
    if (!value) {
      return <></>;
    }

    return (
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style={styles.labelText}>{label}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.valueText}>{value.toString()}</Text>
        </View>
      </View>
    );
  };

  return (
    metadata && (
      <View>
        {metadata.otherClaims.map((elem: any) => (
          <DataRow
            label={strings[elem.claimType] ? strings[elem.claimType] : elem.claimType}
            value={elem.claimValue}
            key={elem.claimType}
          />
        ))}

        {presentation.credentialDetails.issuanceDate && (
          <DataRow 
            label={strings.issuance_date}
            value={moment(presentation.credentialDetails.issuanceDate).format(
              'MMMM Do YYYY, h:mm a',
            )}
          />
        )}
        {presentation.credentialDetails.expirationDate && (
          <DataRow
            label={strings.expiration_date}
            value={moment(presentation.credentialDetails.expirationDate).format(
              'MMMM Do YYYY, h:mm a',
            )}
          />
        )}
      </View>
    )
  );
};

export default PresentationDetail;
