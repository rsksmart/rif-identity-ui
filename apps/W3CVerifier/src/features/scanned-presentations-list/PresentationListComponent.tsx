import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { VerifiedPresentation } from '../../api'
import { layoutStyles, colors } from '../../styles';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';


interface PresentationListProps {
  presentations: VerifiedPresentation[];
  strings: any
  handleShowPresentation: (presentation: VerifiedPresentation) => void,
}

const PresentationList: React.FC<PresentationListProps> = ({
  presentations,
  strings,
  handleShowPresentation,
}) => {
  const toDateString = (isoDate: string) => {
    const date = new Date(isoDate)
    
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  }

  const styles = StyleSheet.create({
    table: {
      height: 500
    },
    row: {
      alignSelf: 'stretch',
      flexDirection: 'row'
    },
    cell: { 
      alignSelf: 'stretch',
      width: 90,
      paddingTop: 10,
      paddingBottom: 10,
      alignItems: 'center'
    },
    headerText: {
      fontWeight: '500',
      fontSize: 10,
      lineHeight: 18,
      color: colors.gray
    },
    citizenText: {
      color: colors.darkestGray,
      fontWeight: '500',
      fontSize: 14,
      lineHeight: 18,
    },
    contentText: {
      color: colors.darkGray,
      fontWeight: '500',
      fontSize: 10,
      lineHeight: 18,
    },
    citizenCell: {
      width: 140
    }
  })

  const renderRow = (presentation: VerifiedPresentation, i: number) => {
    const rowNumber = i + 1;
    const odd = rowNumber % 2 !== 0

    const backgroundColor = odd ? colors.backgroundGray : colors.white;

    const handleViewPresentation = () => handleShowPresentation(presentation)

    return (
      <TouchableOpacity key={i} onPress={handleViewPresentation} style={{ ...styles.row, backgroundColor }}>
        <View style={{...styles.cell, ...styles.citizenCell}}>
          <Text style={styles.citizenText}>{presentation.fullName || presentation.failureReason}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.contentText}>{toDateString(presentation.dateVerified.toString())}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.contentText}>{presentation.success.toString()}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  const header = (
    <View style={{...styles.row, paddingBottom: 0 }}>
      <View style={{...styles.cell, ...styles.citizenCell}}>
        <Text style={styles.headerText}>Citizen</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.headerText}>Date</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.headerText}>Status</Text>
      </View>
    </View>
  )
  return (
    <View style={styles.table}>
      {header}
      <ScrollView>
        {presentations.map(renderRow)}
      </ScrollView>
    </View>
  )
};

export default PresentationList;
