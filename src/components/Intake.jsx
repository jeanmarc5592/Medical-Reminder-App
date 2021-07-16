import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, TouchableWithoutFeedback, Alert, TouchableOpacity, StyleSheet } from 'react-native'
import { withTheme } from 'react-native-elements';
import { useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import { takeMedicine } from '../api/firebase';
import { takeNewMedicine } from '../actions/user';
import { pressOnIntake } from '../actions/intakes';
import { CheckmarkIcon, ClockIcon, InfoIcon } from '../icons';
import { renderMedicineIcon } from '../utils/renderMedicineIcon';
import CustomText from './CustomText'


/* 
  **********************************
  **** PRESSED INTAKE COMPONENT ****
  **********************************
*/

const PressedIntake = ({ id, name, amount, type, dose, reminders, theme, setTaken }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { calendar } = useSelector((state) => state);

  const setTakenStates = () => {
    setTaken(true);
    // Trigger the taken event globally
    // Other components can subscribe to that global event
    dispatch(takeNewMedicine(id));
  };

  const handleOnTake = () => {
    const formattedSelectedDay = calendar?.selectedDay?.date?.toLocaleDateString("en-US");
    takeMedicine(formattedSelectedDay, id, setTakenStates, () => Alert.alert("Something went wrong. Please try again!"));
    dispatch(pressOnIntake(""));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  return (
    <View style={styles(theme).pressedIntakeContainer}>
      <TouchableOpacity onPress={handleOnTake} style={{ marginRight: "auto", marginLeft: 10 }}>
        <CustomText style={{ fontSize: 18 }} fontWeight="bold">
          TAKE
        </CustomText>
      </TouchableOpacity>
      <View style={styles(theme).pressedIntakeCenter}>
        <View>
          <CustomText fontWeight="bold" style={{ fontSize: 18, marginBottom: 5 }}>
            {name}
          </CustomText>
          <CustomText>
            {amount} {`${type}${parseInt(amount) > 1 ? "s" : ""}`}, {dose}
          </CustomText>
        </View>
        {renderMedicineIcon(type)}
      </View>
      <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.navigate("Details")}>
        <InfoIcon />
      </TouchableOpacity>
    </View>
  );
}





/* 
  **********************************
  **** DEFAULT INTAKE COMPONENT ****
  **********************************
*/

const DefaultIntake = ({ taken, name, amount, type, dose, reminder, theme }) => {
  return (
    <>
      {taken ? <CheckmarkIcon style={{ marginRight: 20 }} /> : <ClockIcon style={{ marginRight: 20 }} />}
      <View>
        <CustomText fontWeight="bold" style={{ fontSize: 18, marginBottom: 5 }}>
          {name}
        </CustomText>
        <CustomText>
          {amount} {`${type}${parseInt(amount) > 1 ? "s" : ""}`}, {dose}
        </CustomText>
      </View>
      <View style={styles(theme).defaultIntakeReminder}>
        <CustomText fontWeight="bold">{reminder}</CustomText>
      </View>
      {renderMedicineIcon(type)}
    </>
  )
}






/* 
  **********************************
  **** MAIN INTAKE COMPONENT ****
  **********************************
*/

const Intake = ({ id, takenOn, name, amount, type, dose, reminder, reminderDays, theme, notificationId }) => {
    const { calendar, intakes } = useSelector(state => state);
    const dispatch = useDispatch();
    const [taken, setTaken] = useState(null);

    const subComponentProps = {
      id,
      name,
      amount, 
      type,
      dose,
      reminder,
      reminderDays,
      theme,
      setTaken,
      taken,
      notificationId
    }

    const storeProps = {
      id,
      takenOn,
      name,
      amount,
      type,
      dose,
      notificationId,
      reminder,
      reminderDays
    };

    const handleOnPress = () => {
      dispatch(pressOnIntake(storeProps));
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    };

    const isAlreadyTaken = (intakeId, takenOnArray) => {
      if (!intakeId || !takenOnArray) {
        return false;
      }
      // Check if the currently selected date is in the takenOnArray 
      // to evaluate if the medicine have already been taken or not
      return takenOnArray?.find(date => date === calendar?.selectedDay?.date?.toLocaleDateString("en-US"))
    }

    useEffect(() => {
      setTaken(isAlreadyTaken(id, takenOn));
      dispatch(pressOnIntake(""))
    }, [calendar?.selectedDay])

    return (
      <TouchableWithoutFeedback onLongPress={handleOnPress}>
        <View style={styles(theme).intakeContainer}>
          {intakes.pressedIntake.id === id ? <PressedIntake {...subComponentProps} /> : <DefaultIntake {...subComponentProps} />}
        </View>
      </TouchableWithoutFeedback>
    );
}

const styles = (theme) =>
  StyleSheet.create({
    intakeContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 30,
    },
    pressedIntakeContainer: {
      backgroundColor: theme.background.secondary,
      width: "100%",
      borderRadius: 10,
      paddingVertical: 5,
      paddingHorizontal: 10,
      flexDirection: "row",
      alignItems: "center",
    },
    pressedIntakeCenter: {
      backgroundColor: theme.background.white,
      width: "60%",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 15,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginRight: "auto",
    },
    defaultIntakeReminder: {
      marginLeft: "auto",
      marginRight: 10,
      backgroundColor: theme.background.secondary,
      padding: 10,
      borderRadius: 10,
    },
  });

export default withTheme(Intake);
