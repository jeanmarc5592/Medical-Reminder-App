import React from 'react'
import { useSelector } from 'react-redux'
import { View, TouchableWithoutFeedback } from 'react-native'
import { withTheme } from 'react-native-elements';
import { CheckmarkIcon, ClockIcon } from '../icons';
import { renderMedicineIcon } from '../utils/renderMedicineIcon';
import CustomText from './CustomText'

const Intake = ({ id, takenOn, name, amount, type, dose, reminder, theme }) => {
    const { calendar } = useSelector(state => state)
    console.log(calendar)

    const handleOnPress = () => {
      console.log(calendar?.selectedDay?.date?.toLocaleDateString("en-US"))
    }

    const isAlreadyTaken = (intakeId, takenOnArray) => {
      if (!intakeId || !takenOnArray) {
        return false;
      }
      // Check if the currently selected date is in the takenOnArray 
      // to evaluate if the medicine have already been taken or not
      return takenOnArray?.find(date => date === calendar?.selectedDay?.date?.toLocaleDateString("en-US"))
    }

    return (
      <TouchableWithoutFeedback onPress={handleOnPress}>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 30 }}>
          {isAlreadyTaken(id, takenOn) ? <CheckmarkIcon style={{ marginRight: 20 }} /> : <ClockIcon style={{ marginRight: 20 }} />}
          <View>
            <CustomText fontWeight="bold" style={{ fontSize: 18, marginBottom: 5 }}>
              {name}
            </CustomText>
            <CustomText>
              {amount} {type}, {dose}
            </CustomText>
          </View>
          <View style={{ marginLeft: "auto", marginRight: 10, backgroundColor: theme.background.secondary, padding: 10, borderRadius: 10 }}>
            <CustomText fontWeight="bold">{reminder}</CustomText>
          </View>
          {renderMedicineIcon(type)}
        </View>
      </TouchableWithoutFeedback>
    );
}

export default withTheme(Intake);
