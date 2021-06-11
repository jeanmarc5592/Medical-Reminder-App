import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { ArrowLeftIcon } from '../icons';
import { Screen, Form, CustomText } from '../components/'
import { useNavigation } from '@react-navigation/core';

const AddMedicineScreen = () => {
    const navigation = useNavigation();

    return (
      <Screen>
        <View style={styles.contentContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeftIcon />
          </TouchableOpacity>
          <CustomText h3 fontWeight="bold" style={styles.mainTitle}>
            Add Medicine
          </CustomText>
        </View>
        <CustomText h4 fontWeight="medium" style={styles.medicineTitle}>
          New Medicine
        </CustomText>
        <CustomText style={styles.description}>Fill out the fields and hit the Save Button to add it!</CustomText>
        <Form type="Add" />
      </Screen>
    );
}

const styles = StyleSheet.create({
  contentContainer: {
    marginTop: 15,
    marginBottom: 50,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  mainTitle: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  medicineTitle: {
    marginBottom: 10,
  },
  description: {
    marginBottom: 40,
    textAlign: "center",
  },
});

export default AddMedicineScreen
