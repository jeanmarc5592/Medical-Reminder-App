import React, { useMemo } from 'react';
import { ThemeProvider } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import AppLoading from "expo-app-loading";
import * as Font from 'expo-font';
// import {
//   useFonts,
//   Montserrat_300Light,
//   Montserrat_300Light_Italic,
//   Montserrat_400Regular,
//   Montserrat_400Regular_Italic,
//   Montserrat_500Medium,
//   Montserrat_500Medium_Italic,
//   Montserrat_600SemiBold,
//   Montserrat_600SemiBold_Italic,
//   Montserrat_700Bold,
//   Montserrat_700Bold_Italic,
// } from "@expo-google-fonts/montserrat";
import { useFonts } from "@use-expo/font";
import { LoginScreen, SignupScreen } from './src/screens';

const Stack = createStackNavigator();

const App = () => {
  const customFonts = {
    MontserratLight: require("./assets/fonts/Montserrat-Light.ttf"),
    MontserratRegular: require("./assets/fonts/Montserrat-Regular.ttf"),
    MontserratMedium: require("./assets/fonts/Montserrat-Medium.ttf"),
    MontserratBold: require("./assets/fonts/Montserrat-Bold.ttf"),
  };
  let [fontsLoaded] = useFonts(customFonts);

  const theme = useMemo(() => ({
    background: {
      primary: "#EFFAFF",
    },
    text: {
      primary: "#3E5076",
      fontFamilies: {
        
      },
    },
  }), []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator headerMode={false}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );  
}

export default App;