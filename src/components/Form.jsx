import React, { useState, useMemo, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ScrollView, TouchableOpacity, Appearance, Alert, View, StyleSheet, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { deAT } from 'date-fns/locale';
import CustomInput from './CustomInput'
import CustomText from './CustomText'
import CustomButton from './CustomButton'
import { withTheme, CheckBox } from 'react-native-elements'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DropDownPicker from "react-native-dropdown-picker";
import uuid from "react-native-uuid";
import { editMedicine, deleteMedicine, addMedicine } from '../api/firebase';
import { editIntake } from '../actions/intakes';
import { MEDICINE_TYPES, MEDICINE_DAYS } from '../constants';
import { CheckmarkIcon } from '../icons';

const Form = ({ theme, type = "Add" }) => {
    const initialAddState = {
      id: uuid.v4(),
      name: "",
      type: "",
      dose: "",
      amount: "",
      reminder: "",
      reminderDays: [],
      takenOn: [],
    };
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { pressedIntake } = useSelector((state) => state.intakes);
    const initialState = useMemo(() => {
      return type === "Add" ? initialAddState : pressedIntake;
    }, []);
    const [formState, setFormState] = useState(initialState);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [dropDownPickerVisible, setDropDownPickerVisible] = useState(false);
    const [dropDownPickerItems, setDropDownPickerItems] = useState(MEDICINE_TYPES);

    useEffect(() => {
      // Compare the current values with the initialState and check for empty values
      // If there have been NO updates made or there is at least one empty value, disable the button
      // When there is at least one update and NO empty value, enable the button for the user to submit the changes
      const comparedValues = [];
      const emptyValues = [];
      for (let key in formState) {
        // Check for empty and not updated arrays in the formstate (except the takenOn-Array)
        if (Array.isArray(formState[key]) && key !== "takenOn") {
          emptyValues.push(formState[key].length === 0);
          comparedValues.push(formState[key].sort().toString() === initialState[key].sort().toString());
        // Check for empty and not updated strings in the formstate  
        } else if (typeof formState[key] === "string") {
          emptyValues.push(formState[key] === "");
          comparedValues.push(formState[key] === initialState[key]);
        }
      }
      const hasUpdatedValues = comparedValues.some((value) => value === false);
      const hasEmptyValues = emptyValues.some((value) => value === true);
      setButtonDisabled(!hasUpdatedValues || hasEmptyValues);
    }, [formState]);

    const submitForm = async () => {
        if (type === "Add") {
            const onAddSuccess = () => {
              dispatch(editIntake(formState));
              Alert.alert("Medicine added!", 'You can return to Home by clicking on "Ok"', [
                { text: "Ok", onPress: () => navigation.navigate("Home"), style: "cancel" },
              ]);
            };
            const onAddFailure = () => Alert.alert("Something went wrong. Please try again");
            addMedicine(formState, onAddSuccess, onAddFailure);
        } else if (type === "Edit") {
            const onEditSuccess = () => {
                dispatch(editIntake(formState))
                Alert.alert(
                    'Medicine updated!',
                    'You can return to Home by clicking on "Ok"',
                    [ { text: "Ok", onPress: () => navigation.navigate("Home"), style: "cancel" } ],
                )
            };
            const onEditFailure = () => Alert.alert("Something went wrong. Please try again");
            editMedicine(formState, onEditSuccess, onEditFailure);
        }
    }

    const onDeleteMedicine = () => {
        const onDeleteSuccess = () => {
          dispatch(editIntake(formState));
          Alert.alert("Medicine deleted!", 'You can return to Home by clicking on "Ok"', [
            { text: "Ok", onPress: () => navigation.navigate("Home"), style: "cancel" },
          ]);
        };
        const onDeleteFailure = () => Alert.alert("Something went wrong. Please try again");
        deleteMedicine(formState.id, initialState.notificationId , onDeleteSuccess, onDeleteFailure);
    }

    const handleDatePickerConfirm = date => {
        const formattedTimeString =
          Platform.OS === "ios"
            ? date?.toLocaleString("de-AT", { hour: "2-digit", minute: "2-digit", formatMatcher: "basic" })
            : format(date, "hh:mm", { locale: deAT }).toUpperCase();
        setFormState({ ...formState, reminder: formattedTimeString });
        hideDatePicker();
    }

    const showDatePicker = () => setDatePickerVisible(true);

    const hideDatePicker = () => setDatePickerVisible(false);

    const selectReminderDay = day => {
      const isAdded = formState.reminderDays.findIndex(addedDay => addedDay === day) !== -1;
      if (isAdded) {
        return setFormState({ ...formState, reminderDays: formState.reminderDays.filter(addedDay => addedDay !== day) })
      }
      setFormState({ ...formState, reminderDays: formState.reminderDays.concat(day) })
    }

    return (
      <ScrollView style={{ width: "100%" }} contentContainerStyle={{ paddingHorizontal: 25 }} bounces={false} showsVerticalScrollIndicator={false}>
        {/* *** NAME *** */}
        <CustomText style={styles(theme).inputLabel} fontWeight="medium">
          Name* (e.g. Ibuprofen)
        </CustomText>
        <CustomInput
          containerStyle={styles(theme).inputContainer}
          onChangeText={(name) => setFormState({ ...formState, name })}
          value={formState.name}
          placeholder="Name"
          autoCorrect={false}
        />
        {/* *** TYPE *** */}
        <CustomText style={styles(theme).inputLabel} fontWeight="medium">
          Type*
        </CustomText>
        <DropDownPicker
          placeholderStyle={styles(theme).placeholderStyle}
          arrowIconStyle={styles(theme).arrowIconStyle}
          textStyle={styles(theme).dropDownPickerText}
          dropDownContainerStyle={styles(theme).dropDownPickerContainer}
          style={styles(theme).dropDownPicker}
          value={formState.type}
          setItems={setDropDownPickerItems}
          open={dropDownPickerVisible}
          setOpen={setDropDownPickerVisible}
          items={dropDownPickerItems}
          setValue={(val) => setFormState({ ...formState, type: val() })}
        />
        {/* *** DOSE *** */}
        <CustomText style={styles(theme).inputLabel} fontWeight="medium">
          Dose* (e.g. 100mg)
        </CustomText>
        <CustomInput
          containerStyle={styles.inputContainer}
          onChangeText={(dose) => setFormState({ ...formState, dose })}
          value={formState.dose}
          placeholder="Dose"
          autoCorrect={false}
        />
        {/* *** AMOUNT *** */}
        <CustomText style={styles(theme).inputLabel} fontWeight="medium">
          Amount* (e.g. 3)
        </CustomText>
        <CustomInput
          containerStyle={styles.inputContainer}
          onChangeText={(amount) => setFormState({ ...formState, amount })}
          value={formState.amount}
          placeholder="Amount"
          autoCorrect={false}
        />
        {/* *** REMINDER TIME *** */}
        <CustomText style={styles(theme).inputLabel} fontWeight="medium">
          Reminder Time*
        </CustomText>
        {formState.reminder ? (
          <TouchableOpacity onPress={showDatePicker} style={styles(theme).reminder}>
            <CustomText style={{ fontSize: 16 }} fontWeight="medium">
              {formState.reminder}
            </CustomText>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={showDatePicker} style={styles(theme).addReminderBtn}>
            <CustomText h3 fontWeight="medium">
              +
            </CustomText>
          </TouchableOpacity>
        )}
        <DateTimePickerModal
          textColor="black"
          isDarkModeEnabled={Appearance.getColorScheme() === "dark"}
          display="spinner"
          isVisible={datePickerVisible}
          mode="time"
          onConfirm={handleDatePickerConfirm}
          onCancel={hideDatePicker}
        />
        {/* *** REMINDER DAY *** */}
        <CustomText style={styles(theme).inputLabel} fontWeight="medium">
          Reminder Day*
        </CustomText>
        <View style={{ marginBottom: 30 }}>
          {MEDICINE_DAYS.map((day) => {
            const isChecked = formState.reminderDays.find((addedDay) => addedDay === day.value);
            return (
              <CheckBox
                containerStyle={styles(theme).checkBoxContainerStyle}
                uncheckedColor={isChecked ? theme.text.dark : theme.text.light}
                textStyle={styles(theme, isChecked).checkBoxTextStyle}
                checkedIcon={<CheckmarkIcon />}
                key={day.title}
                title={day.title}
                checked={isChecked}
                onPress={() => selectReminderDay(day.value)}
              />
            );
          })}
        </View>
        {/* *** SUBMIT BUTTON *** */}
        <CustomButton disabled={buttonDisabled} title="Save Medicine" onPress={submitForm} containerStyle={{ marginBottom: 25 }} />
        {/* *** DELETE AREA *** */}
        {type === "Edit" && (
          <View style={styles(theme).deleteContainer}>
            <CustomText fontWeight="bold" color="red" h4 style={styles(theme).deleteTitle}>
              Attention!
            </CustomText>
            <CustomText color="red" style={styles(theme).deleteDescription}>
              Once deleted, your medicine can't be restored again!
            </CustomText>
            <CustomButton
              onPress={onDeleteMedicine}
              title="Delete Medicine"
              titleStyle={styles(theme).deleteBtnTitle}
              type="outline"
              buttonStyle={styles(theme).deleteBtn}
              raised={false}
            />
          </View>
        )}
      </ScrollView>
    );
}

const styles = (theme, isChecked = false) =>
  StyleSheet.create({
    inputLabel: {
      fontSize: 18,
      width: "100%",
      marginLeft: 8,
      marginTop: 5,
      color: theme.text.dark,
      fontFamily: "bold",
    },
    reminder: {
      width: "40%",
      alignItems: "center",
      marginLeft: 8,
      marginTop: 10,
      marginBottom: 30,
      borderWidth: 1,
      borderRadius: 7,
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderColor: theme.text.light,
    },
    addReminderBtn: {
      marginLeft: 8,
      marginTop: 10,
      marginBottom: 30,
      borderRadius: 50,
      height: 45,
      width: 45,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.background.secondary,
    },
    inputContainer: {
      width: "100%",
      marginRight: "auto",
    },
    dropDownPicker: {
      marginTop: 10,
      marginBottom: 30,
      marginLeft: 5,
      marginRight: 8,
      backgroundColor: theme.background.primary,
      borderColor: theme.text.light,
    },
    dropDownPickerText: {
      fontFamily: "medium",
      fontSize: 16,
      color: theme.text.dark,
    },
    dropDownPickerContainer: {
      marginLeft: 5,
      marginTop: 5,
      backgroundColor: theme.background.primary,
      borderColor: theme.text.light,
    },
    arrowIconStyle: {
      // color: theme.text.light,
    },
    placeholderStyle: {
      color: theme.text.light,
    },
    deleteContainer: {
      padding: 25,
      borderWidth: 2,
      marginBottom: 30,
      borderStyle: "dashed",
      width: "100%",
      borderColor: theme.text.red,
    },
    deleteTitle: {
      textAlign: "center",
      marginBottom: 15,
    },
    deleteDescription: {
      textAlign: "center",
      marginBottom: 25,
    },
    deleteBtnTitle: {
      color: theme.text.red,
      fontFamily: "medium",
    },
    deleteBtn: {
      backgroundColor: theme.background.primary,
      borderColor: theme.text.red,
      borderWidth: 1,
    },
    checkBoxContainerStyle: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      paddingLeft: 0,
    },
    checkBoxTextStyle: {
      color: isChecked ? theme.text.dark : theme.text.light,
      fontFamily: isChecked ? "medium" : "regular",
      fontSize: 16,
    },
  });

export default withTheme(Form);
