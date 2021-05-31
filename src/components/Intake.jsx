import React from 'react'
import { View } from 'react-native'
import { withTheme } from 'react-native-elements';
import { CheckmarkIcon, ClockIcon } from '../icons';
import { renderMedicineIcon } from '../utils/renderMedicineIcon';
import CustomText from './CustomText'

const Intake = ({ name, amount, type, dose, reminder, theme }) => {

    return (
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 30 }}>
        {/* <CheckmarkIcon style={{ marginRight: 20 }} /> */}
        <ClockIcon style={{ marginRight: 20 }} />
        <View>
          <CustomText fontWeight="bold" style={{ fontSize: 18, marginBottom: 5 }}>{name}</CustomText>
          <CustomText>
            {amount} {type}, {dose}
          </CustomText>
        </View>
        <View style={{ marginLeft: "auto", marginRight: 10, backgroundColor: theme.background.secondary, padding: 10, borderRadius: 10 }}>
            <CustomText fontWeight="bold">{reminder}</CustomText>
        </View>
        {renderMedicineIcon(type)}
      </View>
    );
}

export default withTheme(Intake);
