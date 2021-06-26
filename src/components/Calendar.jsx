import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isToday, format } from "date-fns";
import { enUS } from "date-fns/locale";
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native'
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
        <CustomText style={styles.yearTitle} fontWeight="medium">
          {Platform.OS === "ios"
            ? `${date?.toLocaleString("en-US", { month: "long", timeZone: "UTC" }).toUpperCase()}, ${date?.getFullYear()}`
            : `${date && format(date, "MMMM, Y", { locale: enUS }).toUpperCase()}`}
        </CustomText>
        <View style={styles.weekContainer}>
          {week.map((weekday) => {
            const isSelectedDay = weekday.id === selectedDay?.id;
            return (
              <TouchableOpacity
                activeOpacity={!isSelectedDay ? 0.2 : 1}
                onPress={() => {
                  // Only change selected day if it's NOT selected yet
                  if (!isSelectedDay) {
                    dispatch(setSelectedDay(weekday));
                  }
                }}
                key={weekday.formatted}
                style={[styles.weekDay, getBackgroundColor(theme, isSelectedDay)]}
              >
                <CustomText fontWeight="bold" h4 style={styles.weekDayIndex}>
                  {weekday.day}
                </CustomText>
                <CustomText style={styles.weekDayFormatted}>{weekday.formatted.toUpperCase()}</CustomText>
              </TouchableOpacity>
            );
          })}
        </View>
      </>
    ); 
}

const styles = StyleSheet.create({
  yearTitle: {
    fontSize: 18,
    alignSelf: "flex-start",
    marginTop: 25,
    marginBottom: 10,
  },
  weekContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 25,
  },
  weekDay: {
    width: "12%",
    borderRadius: 5,
    alignItems: "center",
    paddingVertical: 10,
  },
  weekDayIndex: {
    marginBottom: 5,
  },
  weekDayFormatted: {
    fontSize: 12,
  },
});

const getBackgroundColor = (theme, isSelectedDay) => ({
  backgroundColor: isSelectedDay ? theme.background.secondary : theme.background.grey
})

export default withTheme(Calendar);