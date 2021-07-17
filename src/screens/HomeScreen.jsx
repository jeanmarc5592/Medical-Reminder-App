import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { withTheme, FAB } from 'react-native-elements';
import { MaterialIcons } from "@expo/vector-icons";
import MenuDrawer from "react-native-side-drawer";
import { signUserOut, getUser } from '../api/firebase';
import { saveToSecureStore, getFromSecureStore } from '../api/secureStore';
import * as Notifications from "expo-notifications";
import { Screen, CustomText, IntakesProgress, Calendar, IntakesList, CustomButton } from '../components';
import { setUserData } from '../actions/user';
import { pressOnIntake, setIntakesForToday } from '../actions/intakes';
import { registerForPushNotificationsAsync } from '../api/pushNotifications';


const HomeScreen = ({ navigation, theme }) => {
  const dispatch = useDispatch();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [token, setToken] = useState("");
  const { user, calendar, intakes } = useSelector((state) => state);
  const responseListener = useRef();

  useEffect(() => {
    const onSuccess = (userData) => dispatch(setUserData(userData));
    const showAlert = () => {
      Alert.alert("Something wrent wrong getting your data. You will be logged out safely", "", [
        { text: "Ok", onPress: () => signUserOut(), style: "cancel" },
      ]);
    };
    getUser(onSuccess, showAlert);
  }, [calendar?.selectedDay, user?.newMedicineTaken, intakes?.editedIntake]);

  // Checks if the selected day (e.g. "Mon") is included in the reminders
  // This ensures to render only the reminders that are relevant for that day
  useEffect(() => {
    const filteredIntakesForToday = user?.reminders?.filter((reminder) => reminder.reminderDays.includes(calendar?.selectedDay?.formatted));
    dispatch(setIntakesForToday(filteredIntakesForToday));
  }, [user?.reminders, calendar?.selectedDay]);

  useEffect(() => {
    // Always Clear pressedIntake State when focusing HomeScreen
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(pressOnIntake(""));
    });
    return unsubscribe;
  });

  useEffect(() => {
    const bootstrapAsync = async () => {
      let deviceToken = await getFromSecureStore("deviceToken");
      // If a deviceToken is already saved just set the token state and return early
      if (deviceToken) {
        return setToken(deviceToken);
      }
      // Else register a new one, save it to secure store and set the token state
      registerForPushNotificationsAsync().then((token) => {
        saveToSecureStore("deviceToken", token);
        setToken(deviceToken);
      });
    };

    bootstrapAsync();
    
    // **** REMOVE COMMENTS FOR DEBUGGING ****
    // Notifications.cancelAllScheduledNotificationsAsync().then(response => console.log(response))
    // Notifications.getAllScheduledNotificationsAsync().then(response => console.log(response));

    return () => {
      Notifications.removeNotificationSubscription(responseListener.current);
    }
  }, []);

  const drawerContent = () => {
    return (
      <View style={styles(theme).drawerContentContainer}>
        <TouchableOpacity onPress={() => setDrawerOpen(false)} style={styles(theme).drawerCloseButton}>
          <MaterialIcons name="close" size={30} color={theme.text.dark} style={styles(theme).drawerCloseIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={signUserOut} style={styles(theme).logoutButton}>
          <MaterialIcons name="logout" size={24} color={theme.text.dark} style={{ marginRight: 5 }} />
          <CustomText fontWeight="medium" style={{ fontSize: 18 }}>
            Logout
          </CustomText>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <MenuDrawer open={drawerOpen} drawerContent={drawerContent()} opacity={0.2} animationTime={250} overlay drawerPercentage={85}>
      <Screen>
        <View style={styles(theme).mainContainer}>
          <TouchableOpacity onPress={() => setDrawerOpen(true)} style={styles(theme).openDrawerButton}>
            <MaterialIcons name="menu" size={24} color={theme.text.dark} />
          </TouchableOpacity>
          <View style={styles(theme).userAvatar}>
            <CustomText style={styles(theme).userSymbol}>{user?.name?.[0]}</CustomText>
          </View>
        </View>
        <Calendar />
        <ScrollView bounces={false} style={{ width: "100%" }} contentContainerStyle={{ alignItems: "center" }} showsVerticalScrollIndicator={false}>
          <IntakesProgress />
          <IntakesList />
        </ScrollView>
        <FAB
          title="+"
          placement="right"
          color={theme.background.orange}
          titleStyle={styles(theme).addMedicineIcon}
          containerStyle={{ marginBottom: 20 }}
          buttonStyle={{ borderRadius: 50 }}
          onPress={() => navigation.navigate("Add")}
        />
      </Screen>
    </MenuDrawer>
  );
}

const styles = (theme) =>
  StyleSheet.create({
    mainContainer: {
      alignSelf: "flex-start",
      width: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      marginTop: 15,
    },
    userAvatar: {
      marginLeft: "auto",
      backgroundColor: theme.text.dark,
      borderRadius: 50,
      height: 50,
      width: 50,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    userSymbol: {
      color: theme.background.white,
      fontSize: 25,
    },
    openDrawerButton: {
      padding: 15,
      paddingLeft: 0,
    },
    drawerContentContainer: {
      backgroundColor: theme.background.secondary,
      height: "100%",
      paddingTop: 75,
      paddingHorizontal: 25,
    },
    drawerCloseButton: {
      flexDirection: "row",
      alignItems: "center",
      padding: 15,
      paddingLeft: 0,
    },
    drawerCloseIcon: {
      marginBottom: 30,
      marginLeft: -4,
    },
    logoutButton: {
      flexDirection: "row",
      alignItems: "center",
    },
    addMedicineIcon: {
      color: theme.text.dark,
      fontSize: 25,
      fontFamily: "bold",
    },
  });

export default withTheme(HomeScreen);
