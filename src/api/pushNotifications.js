import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { Platform, Alert } from 'react-native';
import getEnvVars from "../../environment";
import { getWeekdayNumber } from '../utils/getWeekdayNumber';

const { EXPO_PUSH_SERVER_URL } = getEnvVars();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});


/**
 * ********************************************* 
 * **** Registers a Push Notification Token ****
 * ***+*****************************************
 * @returns {String} - registered push notification token 
 * @throws {String} - Alert if something went wrong registering the token (e.g. permission to receive push notifications denied by user)
 */
export const registerForPushNotificationsAsync = async () => {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      Alert.alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    Alert.alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
};



/**
 * ***********************************
 * **** Sends a push notification ****
 * ***********************************
 * @param {String} expoPushToken - Push Token from the individual device
 * @param {String} messageTitle - Title that shows up in the notification
 * @param {String} messageBody - Body Text that shows up in the notification
 * @returns {Void} - Nothing
 */
export const sendPushNotification = async (expoPushToken, messageTitle = "", messageBody = "") => {
  if (!expoPushToken || !EXPO_PUSH_SERVER_URL) {
    return;
  }

  const message = {
    to: expoPushToken,
    sound: "default",
    title: messageTitle,
    body: messageBody,
    data: { someData: "goes here" },
  };

  await fetch(EXPO_PUSH_SERVER_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}


// TODO: Add Docs
// TODO: Implement function that handles GMT for summer and winter time
export const scheduleNotification = async (reminder, reminderDays, notificationName = "") => {
  if (!reminder || !reminderDays) {
    return;
  }

  let identifier;
  const [hour, minute] = reminder.split(/:| /);
  const scheduleInput = {
    content: {
      title: "It's time for your next intake!",
      body: `${notificationName} is ready to be taken...`,
      sound: "default"
    },
  };
  if (reminderDays.length === 7) {
    // DAILY (ALL SEVEN DAYS ARE SELECTED)
    scheduleInput.trigger = {
      hour: parseInt(hour),
      minute: parseInt(minute),
      repeats: true,
      timezone: "UTC+2",
    };
    identifier = await Notifications.scheduleNotificationAsync(scheduleInput)
  } else if (reminderDays.length === 1) {
    // ONCE A WEEK (ONE DAY IS SELECTED)
    reminderDays.forEach(async (day) => {
      const weekDayNumber = getWeekdayNumber(day);
      scheduleInput.trigger = {
        weekday: weekDayNumber,
        hour: parseInt(hour),
        minute: parseInt(minute),
        repeats: true,
        timezone: "UTC+2",
      };
    });
    identifier = await Notifications.scheduleNotificationAsync(scheduleInput);
    } else {
      // ON MULTIPLE DAYS PER WEEK
      reminderDays.forEach(async (day) => {
        const weekDayNumber = getWeekdayNumber(day);
        scheduleInput.trigger = {
          weekDayNumber: weekDayNumber,
          hour: parseInt(hour),
          minute: parseInt(minute),
          repeats: true,
          timezone: "UTC+2",
        };
      identifier = await Notifications.scheduleNotificationAsync(scheduleInput);
      });
    }

    return identifier;
};  

// TODO: Add Docs & Implement correctly
export const getScheduledNotifications = () => {
  // const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();
  // return scheduledNotifications;
}