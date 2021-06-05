import React from 'react';
import { useSelector } from 'react-redux';
import { View, TouchableOpacity } from 'react-native';
import { Screen, CustomText, Form } from '../components';
import { ArrowLeftIcon } from '../icons';
import { withTheme } from 'react-native-elements';

const MedicineDetailsScreen = ({ navigation, theme }) => {
    const { pressedIntake } = useSelector(state => state.intakes);

    return (
      <Screen>
        <View style={{ marginTop: 15, marginBottom: 50, flexDirection: "row", alignItems: "center", width: "100%" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeftIcon />
          </TouchableOpacity>
          <CustomText h3 fontWeight="bold" style={{ marginLeft: "auto", marginRight: "auto" }}>
            Medicine Details
          </CustomText>
        </View>
        <CustomText h4 fontWeight="medium" style={{ marginBottom: 10 }}>
          {pressedIntake?.name}
        </CustomText>
        <CustomText style={{ marginBottom: 40, textAlign: "center" }}>If you'd like to edit, change the fields and hit the save button!</CustomText>
        <Form type="Edit" />
      </Screen>
    );
}

export default withTheme(MedicineDetailsScreen);
