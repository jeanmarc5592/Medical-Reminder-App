import React, { useState, useMemo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ScrollView } from 'react-native'
import { CustomInput, CustomText, CustomButton } from '../components'
import { withTheme } from 'react-native-elements'
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

    return (
      <ScrollView style={{ width: "100%" }} contentContainerStyle={{ paddingHorizontal: 25 }} bounces={false}>
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
          placeholder="Reminder"
          autoCorrect={false}
        />
        <CustomButton disabled={buttonDisabled} title="Save Medicine" onPress={submitForm} />
      </ScrollView>
    );
}

export default withTheme(Form);
