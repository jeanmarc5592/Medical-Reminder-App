import React, { useMemo } from 'react';
import { ThemeProvider } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import AppLoading from "expo-app-loading";
import { useFonts } from "@use-expo/font";
import { LoginScreen, SignupScreen } from './src/screens';

const Stack = createStackNavigator();

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
      white: "#fff"
    },
    text: {
      dark: "#3E5076",
      light: "#96A5BA",
      green: "#19EDBE",
      red: "#DA282F",
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