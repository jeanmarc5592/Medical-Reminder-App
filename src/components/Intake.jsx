import React from 'react'
import { View } from 'react-native'
import { withTheme } from 'react-native-elements';
import { CheckmarkGreen, Clock } from '../icons';
import CustomText from './CustomText'

const Intake = ({ name, amount, type, dose, reminder, theme }) => {

    return (
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 30 }}>
        {/* <CheckmarkGreen style={{ marginRight: 20 }} /> */}
        <Clock style={{ marginRight: 20 }} />
        <View>
          <CustomText fontWeight="bold" style={{ fontSize: 18, marginBottom: 5 }}>{name}</CustomText>
          <CustomText>
            {amount} {type}, {dose}
          </CustomText>
        </View>
        <View style={{ marginLeft: "auto", backgroundColor: theme.background.secondary, padding: 10, borderRadius: 10 }}>
            <CustomText fontWeight="bold">{reminder}</CustomText>
        </View>
      </View>
    );
}

export default withTheme(Intake);
