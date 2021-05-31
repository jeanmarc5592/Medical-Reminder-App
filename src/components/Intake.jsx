import React from 'react'
import { View } from 'react-native'
import CustomText from './CustomText'

const Intake = ({ name, amount, type, dose, reminder }) => {
    return (
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 35 }}>
        <View>
          <CustomText fontWeight="bold" style={{ fontSize: 18, marginBottom: 5 }}>{name}</CustomText>
          <CustomText>
            {amount} {type}, {dose}
          </CustomText>
        </View>
        <View style={{ marginLeft: "auto"}}>
            <CustomText>{reminder}</CustomText>
        </View>
      </View>
    );
}

export default Intake
