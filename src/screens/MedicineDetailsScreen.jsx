import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { Screen, CustomText, CustomInput, CustomButton } from '../components';
import { ArrowLeftIcon } from '../icons';
import { withTheme } from 'react-native-elements';

const MedicineDetailsScreen = ({ navigation, theme }) => {
    const { pressedIntake } = useSelector(state => state.intakes);
    const [formState, setFormState] = useState(pressedIntake);

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
        <CustomText style={{ marginBottom: 40, textAlign: "center" }}>If you'd like to edit, tap the input fields and hit the save button!</CustomText>
        <ScrollView style={{ width: "100%" }} contentContainerStyle={{ paddingHorizontal: 25}} bounces={false}>
          {/* *** NAME *** */}
          <CustomText style={{ fontSize: 18, width: "100%", marginLeft: 8, color: theme.text.light }} fontWeight="medium">
            Name
          </CustomText>
          <CustomInput
            containerStyle={{ width: "100%", marginRight: "auto" }}
            onChangeText={(name) => setFormState({ ...formState, name })}
            value={formState.name}
            placeholder="Name"
            autoCorrect={false}
          />
          {/* *** TYPE *** */}
          <CustomText style={{ fontSize: 18, width: "100%", marginLeft: 8, marginTop: 5, color: theme.text.light }} fontWeight="medium">
            Type
          </CustomText>
          <CustomInput
            containerStyle={{ width: "100%", marginRight: "auto" }}
            onChangeText={(type) => setFormState({ ...formState, type })}
            value={formState.type}
            placeholder="Type"
            autoCorrect={false}
          />
          {/* *** DOSE *** */}
          <CustomText style={{ fontSize: 18, width: "100%", marginLeft: 8, marginTop: 5, color: theme.text.light }} fontWeight="medium">
            Dose
          </CustomText>
          <CustomInput
            containerStyle={{ width: "100%", marginRight: "auto" }}
            onChangeText={(dose) => setFormState({ ...formState, dose })}
            value={formState.dose}
            placeholder="Dose"
            autoCorrect={false}
          />
          {/* *** AMOUNT *** */}
          <CustomText style={{ fontSize: 18, width: "100%", marginLeft: 8, marginTop: 5, color: theme.text.light }} fontWeight="medium">
            Amount
          </CustomText>
          <CustomInput
            containerStyle={{ width: "100%", marginRight: "auto" }}
            onChangeText={(amount) => setFormState({ ...formState, amount })}
            value={formState.amount}
            placeholder="Amount"
            autoCorrect={false}
          />
          {/* *** REMINDER *** */}
          <CustomText style={{ fontSize: 18, width: "100%", marginLeft: 8, marginTop: 5, color: theme.text.light }} fontWeight="medium">
            Reminder
          </CustomText>
          <CustomInput
            containerStyle={{ width: "100%", marginRight: "auto" }}
            onChangeText={(name) => setFormState({ ...formState, name })}
            value={formState.reminder}
            placeholder="Amount"
            autoCorrect={false}
          />
          <CustomButton title="Save Medicine" />
        </ScrollView>
      </Screen>
    );
}

export default withTheme(MedicineDetailsScreen);
