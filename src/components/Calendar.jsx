import { isToday } from 'date-fns';
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { withTheme } from 'react-native-elements';
import { getWeekDays } from '../utils/getWeekDays';
import CustomText  from './CustomText'

const Calendar = ({ date, theme }) => {
    const [week, setWeek] = useState([]);

    useEffect(() => {
        const weekDays = getWeekDays(date);
        setWeek(weekDays);
    }, [date]);

    return (
      <>
        <CustomText style={{ fontSize: 18, alignSelf: "flex-start", marginTop: 15, marginBottom: 10 }} fontWeight="medium">
            {date?.toLocaleString("default", { month: "long" }).toUpperCase()}, {date?.getFullYear()}
        </CustomText>
        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
          {week.map((weekday) => {
            return (
              <View 
                key={weekday.formatted} 
                style={{ backgroundColor: isToday(weekday.date) ? theme.background.secondary : theme.background.grey , width: "12%", borderRadius: 5, alignItems: "center", paddingVertical: 10 }}
            >
                <CustomText fontWeight="bold" h4 style={{ marginBottom: 5 }}>{weekday.day}</CustomText>
                <CustomText style={{ fontSize: 12}}>{weekday.formatted.toUpperCase()}</CustomText>
              </View>
            );
          })}
        </View>
      </>
    ); 
}

export default withTheme(Calendar);