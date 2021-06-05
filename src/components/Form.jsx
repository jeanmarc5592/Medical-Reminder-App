import React, { useState, useMemo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ScrollView, TouchableOpacity, Appearance } from 'react-native'
import CustomInput from './CustomInput'
import CustomText from './CustomText'
import CustomButton from './CustomButton'
import { withTheme } from 'react-native-elements'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import uuid from "react-native-uuid";

const initialAddState = {
    id: uuid.v4(),
    name: "",
    type: "",
    dose: "",
    amount: "",
    reminder: "",
    takenOn: []
}

const Form = ({ theme, type = "Add" }) => {
    const { pressedIntake } = useSelector((state) => state.intakes);
    const initialState = useMemo(() => {
      return type === "Add" ? initialAddState : pressedIntake;
    }, []);
    const [formState, setFormState] = useState(initialState);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [datePickerVisible, setDatePickerVisible] = useState(false);

    useEffect(() => {
        if (type === "Edit") {
            // Compare the current values with the initialState and check for empty values
            // If there have been NO updates made or there is at least one empty value, disable the button
            // When there is at least one update and NO empty value, enable the button for the user to submit the changes
            const comparedValues = [];
            const emptyValues = [];
            for (let key in formState) {
                comparedValues.push(formState[key] === initialState[key]);
                emptyValues.push(formState[key] === "");
            }
            const hasUpdatedValues = comparedValues.some((value) => value === false);
            const hasEmptyValues = emptyValues.some((value) => value === true);
            setButtonDisabled(!hasUpdatedValues || hasEmptyValues);
        }
    }, [formState]);

    const submitForm = () => {
        if (type === "Add") {
            console.log("Add to DB", formState)
        } else if (type === "Edit") {
            console.log("Edit Medicine", formState)
        }
    }

    const handleDatePickerConfirm = date => {
        const formattedTimeString = date?.toLocaleString("en-US", { hour: "2-digit", minute: "2-digit", formatMatcher: "basic" });
        setFormState({ ...formState, reminder: formattedTimeString });
        hideDatePicker();
    }

    const showDatePicker = () => setDatePickerVisible(true);

    const hideDatePicker = () => setDatePickerVisible(false);

    return (
      <ScrollView style={{ width: "100%" }} contentContainerStyle={{ paddingHorizontal: 25 }} bounces={false} showsVerticalScrollIndicator={false}>
        {/* *** NAME *** */}
        <CustomText style={{ fontSize: 18, width: "100%", marginLeft: 8, color: theme.text.light }} fontWeight="medium">
          Name* (e.g. Ibuprofen)
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
          Type*
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
          Dose* (e.g. 100mg)
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
          Amount* (e.g. 3)
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
          Reminder*
        </CustomText>
        <TouchableOpacity 
            onPress={showDatePicker}
            style={{ 
                width: "40%", 
                alignItems: "center", 
                marginLeft: 8, 
                marginTop: 10, 
                marginBottom: 30, 
                borderWidth: 1, 
                borderColor: theme.text.light, 
                borderRadius: 7, 
                paddingVertical: 10, 
                paddingHorizontal: 10 
            }}
        >
            <CustomText style={{ fontSize: 16 }} fontWeight="medium">{formState.reminder}</CustomText>
        </TouchableOpacity>
        <DateTimePickerModal 
            textColor="black"
            isDarkModeEnabled={Appearance.getColorScheme() === "dark"}
            display="spinner"
            isVisible={datePickerVisible} 
            mode="time" 
            onConfirm={handleDatePickerConfirm} 
            onCancel={hideDatePicker}
        />
        <CustomButton disabled={buttonDisabled} title="Save Medicine" onPress={submitForm} containerStyle={{ marginBottom: 25 }} />
      </ScrollView>
    );
}

export default withTheme(Form);
