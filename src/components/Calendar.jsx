import { getMonth, isToday } from 'date-fns';
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { getWeekDays } from '../utils/getWeekDays';
import CustomText  from './CustomText'

const Calendar = ({ date }) => {
    const [week, setWeek] = useState([]);

    useEffect(() => {
        const weekDays = getWeekDays(date);
        setWeek(weekDays);
    }, [date]);

    console.log(week);

    return (
      <>
        <CustomText>{date?.toLocaleString("default", { month: "long" }).toUpperCase()}, {date?.getFullYear()}</CustomText>
        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
          {week.map((weekday) => {
            return (
              <View key={weekday.formatted}>
                <CustomText>{weekday.day}</CustomText>
                <CustomText>{weekday.formatted.toUpperCase()}</CustomText>
              </View>
            );
          })}
        </View>
      </>
    ); 
}

export default Calendar