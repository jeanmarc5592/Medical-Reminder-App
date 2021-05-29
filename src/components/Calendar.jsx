import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isToday } from "date-fns";
import { View, TouchableOpacity } from 'react-native'
import { withTheme } from 'react-native-elements';
import { getWeekDays } from '../utils/getWeekDays';
import { setSelectedDay } from '../actions/calendar';
import CustomText  from './CustomText'

const Calendar = ({ theme }) => {
    const dispatch = useDispatch();
    const { date, selectedDay } = useSelector(state => state.calendar);
    const [week, setWeek] = useState([]);

    useEffect(() => {
        const weekDays = getWeekDays(date);
        // Get today and save it in redux store to highlight it initially as the default selected day
        weekDays.forEach((weekday) => {
          if (isToday(weekday.date)) {
            dispatch(setSelectedDay(weekday))
          }
        })
        setWeek(weekDays);
    }, [date]);

    return (
      <>
        <CustomText style={{ fontSize: 18, alignSelf: "flex-start", marginTop: 25, marginBottom: 10 }} fontWeight="medium">
            {date?.toLocaleString("en-US", { month: "long", timeZone: "UTC" }).toUpperCase()}, {date?.getFullYear()}
        </CustomText>
        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
          {week.map((weekday) => {
            const isSelectedDay = weekday.id === selectedDay?.id;
            return (
              <TouchableOpacity 
                activeOpacity={!isSelectedDay ? 0.2 : 1 }
                onPress={() => {
                  // Only change selected day if it's NOT selected yet
                  if (!isSelectedDay) {
                    dispatch(setSelectedDay(weekday))
                  }
                }}
                key={weekday.formatted} 
                style={{ backgroundColor: isSelectedDay ? theme.background.secondary : theme.background.grey , width: "12%", borderRadius: 5, alignItems: "center", paddingVertical: 10 }}
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