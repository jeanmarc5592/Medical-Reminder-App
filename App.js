import React, { useMemo } from 'react';
import { ThemeProvider } from "react-native-elements";
import { Provider } from 'react-redux';
import store from './src/store';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import AppLoading from "expo-app-loading";
import { useFonts } from "@use-expo/font";
import * as firebase from 'firebase';
import firebaseConfig from './src/config/firebase';
import { LoginScreen, SignupScreen, HomeScreen, ResolveAuthScreen } from './src/screens';
import { StatusBar } from 'react-native';

// Whole Application (Auth-Flow + Main-Flow)
const AppStack = createStackNavigator();

const App = () => {
  const customFonts = {
    light: require("./assets/fonts/Montserrat-Light.ttf"),
    regular: require("./assets/fonts/Montserrat-Regular.ttf"),
    medium: require("./assets/fonts/Montserrat-Medium.ttf"),
    bold: require("./assets/fonts/Montserrat-Bold.ttf"),
  };
  let [fontsLoaded] = useFonts(customFonts);

  const theme = useMemo(() => ({
    background: {
      primary: "#EFFAFF",
      secondary: "#BCEBFE",
      white: "#fff",
      grey: "rgba(226, 228, 232, 0.5)",
      lightGrey: "rgba(216, 216, 216, 0.2)",
      orange: "#FFE190"

    },
    text: {
      dark: "#3E5076",
      light: "#96A5BA",
      green: "#19EDBE",
      red: "#DA282F",
    },
  }), []);

  // Checks if Firebase is NOT called anywhere else before initialization
  if (!firebase.apps.length) {
    console.log("Connected with Firebase");
    firebase.initializeApp(firebaseConfig);
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <StatusBar barStyle="dark-content" />
          <NavigationContainer>
            <AppStack.Navigator headerMode={false}>
              <AppStack.Screen name="ResolveAuth" component={ResolveAuthScreen} />
              <AppStack.Screen name="Login" component={LoginScreen} />
              <AppStack.Screen name="Signup" component={SignupScreen} />
              <AppStack.Screen name="Home" component={HomeScreen} />
            </AppStack.Navigator>
          </NavigationContainer>
        </ThemeProvider>
      </SafeAreaProvider>
    </Provider>
  );  
}

export default App;