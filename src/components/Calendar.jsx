import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { isToday } from "date-fns";
import { View, TouchableOpacity } from 'react-native'
import { withTheme } from 'react-native-elements';
import { getWeekDays } from '../utils/getWeekDays';
import CustomText  from './CustomText'

const Calendar = ({ theme }) => {
    const { date } = useSelector(state => state.calendar);
    const [week, setWeek] = useState([]);

    useEffect(() => {
        const weekDays = getWeekDays(date);
        setWeek(weekDays);
    }, [date]);

    return (
      <>
        <CustomText style={{ fontSize: 18, alignSelf: "flex-start", marginTop: 15, marginBottom: 10 }} fontWeight="medium">
            {date?.toLocaleString("en-US", { month: "long", timeZone: "UTC" }).toUpperCase()}, {date?.getFullYear()}
        </CustomText>
        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
          {week.map((weekday) => {
            return (
              <TouchableOpacity 
                key={weekday.formatted} 
                style={{ backgroundColor: isToday(weekday.date) ? theme.background.secondary : theme.background.grey , width: "12%", borderRadius: 5, alignItems: "center", paddingVertical: 10 }}
            >
                <CustomText fontWeight="bold" h4 style={{ marginBottom: 5 }}>{weekday.day}</CustomText>
                <CustomText style={{ fontSize: 12}}>{weekday.formatted.toUpperCase()}</CustomText>
              </TouchableOpacity>
            );
          })}
        </View>
      </>
    ); 
}

export default withTheme(Calendar);