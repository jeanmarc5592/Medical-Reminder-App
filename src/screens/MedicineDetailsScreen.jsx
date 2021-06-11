import React from 'react';
import { useSelector } from 'react-redux';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Screen, CustomText, Form } from '../components';
import { ArrowLeftIcon } from '../icons';
import { withTheme } from 'react-native-elements';

const MedicineDetailsScreen = ({ navigation, theme }) => {
    const { pressedIntake } = useSelector(state => state.intakes);

    return (
      <Screen>
        <View style={styles.innerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeftIcon />
          </TouchableOpacity>
          <CustomText h3 fontWeight="bold" style={styles.mainTitle}>
            Medicine Details
          </CustomText>
        </View>
        <CustomText h4 fontWeight="medium" style={styles.medicineName}>
          {pressedIntake?.name}
        </CustomText>
        <CustomText style={styles.description}>If you'd like to edit, change the fields and hit the save button!</CustomText>
        <Form type="Edit" />
      </Screen>
    );
}

const styles = StyleSheet.create({
  innerContainer: {
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
  medicineName: {
    marginBottom: 10,
  },
  description: {
    marginBottom: 40,
    textAlign: "center",
  },
});

export default withTheme(MedicineDetailsScreen);
