import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { withTheme } from 'react-native-elements';
import { AnimatedCircularProgress } from "react-native-circular-progress";
import CustomText from './CustomText';
import isToday from 'date-fns/isToday';

const IntakesProgress = ({ theme }) => {
    const { user, calendar, intakes } = useSelector(state => state);
    const [takenToday, setTakenToday] = useState([]);

    useEffect(() => {
      const takenMedicinesToday = [];
      intakes?.intakesForToday?.forEach((reminder) => {
        reminder?.takenOn?.forEach((takenDate) => {
          if (takenDate == calendar?.selectedDay?.date?.toLocaleDateString("en-US")) {
            takenMedicinesToday.push(takenDate);
          }
        });
      });
      setTakenToday(takenMedicinesToday);
    }, [user?.newMedicineTaken, calendar?.selectedDay?.date, intakes?.intakesForToday]);

    const allMedicinesTaken = useMemo(() => {
      if (takenToday.length !== 0 && intakes?.intakesForToday?.length !== 0) {
        return takenToday.length === intakes?.intakesForToday?.length
      }
      return;
    }, [takenToday, intakes?.intakesForToday])

    return (
      <View style={styles(theme).mainContainer}>
        <View style={styles(theme).innerContainer}>
          <AnimatedCircularProgress
            size={200}
            width={15}
            fill={takenToday.length * 100 / intakes?.intakesForToday?.length}
            tintColor={takenToday.length === intakes?.intakesForToday?.length ? theme.text.green : theme.background.secondary}
            backgroundColor={theme.background.lightGrey}
            rotation={0}
            lineCap="round"
          >
            {() => (
              <View style={styles(theme).innerProgressContainer}>
                <CustomText h4 fontWeight="bold">
                  INTAKES
                </CustomText>
                <View style={{ flexDirection: "row" }}>
                  <CustomText
                    h1
                    fontWeight="bold"
                    style={{ color: allMedicinesTaken ? theme.text.green : theme.background.secondary }}
                  >
                    {takenToday.length}
                  </CustomText>
                  <CustomText
                    h1
                    fontWeight="bold"
                    style={{ color: allMedicinesTaken ? theme.text.green : theme.text.dark }}
                  >
                    {" "}
                    / {intakes?.intakesForToday?.length}
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

const styles = (theme) =>
  StyleSheet.create({
    mainContainer: {
      backgroundColor: theme.background.lightGrey,
      width: 250,
      height: 250,
      borderRadius: 250,
      alignItems: "center",
      justifyContent: "center",
    },
    innerContainer: {
      backgroundColor: theme.background.white,
      width: "90%",
      height: "90%",
      borderRadius: 250,
      alignItems: "center",
      justifyContent: "center",
    },
    innerProgressContainer: {
      width: "100%",
      height: "100%",
      alignItems: "center",
      padding: 20,
      justifyContent: "space-around",
    },
  });

export default withTheme(IntakesProgress);
