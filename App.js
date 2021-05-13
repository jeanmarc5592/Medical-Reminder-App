import React from 'react';
import { ThemeProvider } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, SignupScreen } from './src/screens';

const Stack = createStackNavigator();

const theme = {
  background: {
    primary: "#EFFAFF",
  },
};

const App = () => {
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