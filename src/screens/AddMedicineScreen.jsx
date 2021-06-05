import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { ArrowLeftIcon } from '../icons';
import { Screen, Form, CustomText } from '../components/'
import { useNavigation } from '@react-navigation/core';

const AddMedicineScreen = () => {
    const navigation = useNavigation();

    return (
      <Screen>
        <View style={{ marginTop: 15, marginBottom: 50, flexDirection: "row", alignItems: "center", width: "100%" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeftIcon />
          </TouchableOpacity>
          <CustomText h3 fontWeight="bold" style={{ marginLeft: "auto", marginRight: "auto" }}>
            Add Medicine
          </CustomText>
        </View>
        <CustomText h4 fontWeight="medium" style={{ marginBottom: 10 }}>
          New Medicine
        </CustomText>
        <CustomText style={{ marginBottom: 40, textAlign: "center" }}>Fill out the fields and hit the Save Button to add it!</CustomText>
        <Form type="Add" />
      </Screen>
    );
}

export default AddMedicineScreen
