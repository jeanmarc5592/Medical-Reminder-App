import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { View } from 'react-native';
import { withTheme } from 'react-native-elements';
import { AnimatedCircularProgress } from "react-native-circular-progress";
import CustomText from './CustomText';
import isToday from 'date-fns/isToday';

const IntakesProgress = ({ theme }) => {
    const { user, calendar } = useSelector(state => state);
    const [takenToday, setTakenToday] = useState([]);

    useEffect(() => {
      const takenMedicinesToday = [];
      user?.reminders?.forEach(reminder => {
        reminder?.takenOn?.forEach(takenDate => {
          if (takenDate == calendar?.selectedDay?.date?.toLocaleDateString("en-US")) {
            takenMedicinesToday.push(takenDate);
          }
        })
      });
      setTakenToday(takenMedicinesToday);
    }, [calendar?.selectedDay?.date, user?.reminders, user?.newMedicineTaken]);

    return (
      <View
        style={{
          backgroundColor: theme.background.lightGrey,
          width: 250,
          height: 250,
          borderRadius: 250,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            backgroundColor: theme.background.white,
            width: "90%",
            height: "90%",
            borderRadius: 250,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AnimatedCircularProgress
            size={200}
            width={15}
            fill={(takenToday.length / user?.reminders?.length) * 100}
            tintColor={takenToday.length === user?.reminders?.length ? theme.text.green : theme.background.secondary}
            backgroundColor={theme.background.lightGrey}
            rotation={0}
            lineCap="round"
          >
            {() => (
              <View style={{ width: "100%", height: "100%", alignItems: "center", padding: 20, justifyContent: "space-around" }}>
                <CustomText h4 fontWeight="bold">
                  INTAKES
                </CustomText>
                <View style={{ flexDirection: "row" }}>
                  <CustomText
                    h1
                    fontWeight="bold"
                    style={{ color: takenToday.length === user?.reminders?.length ? theme.text.green : theme.background.secondary }}
                  >
                    {takenToday.length}
                  </CustomText>
                  <CustomText
                    h1
                    fontWeight="bold"
                    style={{ color: takenToday.length === user?.reminders?.length ? theme.text.green : theme.text.dark }}
                  >
                    {" "}
                    / {user?.reminders?.length}
                  </CustomText>
                </View>
                <CustomText>
                  {isToday(calendar?.selectedDay?.date) ? "Today" : calendar?.selectedDay?.date?.toLocaleString("en-US", { weekday: "long" })}
                </CustomText>
              </View>
            )}
          </AnimatedCircularProgress>
        </View>
      </View>
    );
}

export default withTheme(IntakesProgress);
