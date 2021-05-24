import React, { useEffect } from 'react'
import { ActivityIndicator } from 'react-native';
import { withTheme } from 'react-native-elements';
import * as firebase from 'firebase';
import { Screen, CustomText } from '../components';

const ResolveAuthScreen = ({ navigation, theme }) => {
  // Check for Authentication Persistance or any other Auth Changes 
  useEffect(() => {
    const cleanup = () => {
      setTimeout(() => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            navigation.replace("Home");
          } else {
            navigation.replace("Login");
          }
        });
      }, 3000);
    };
    cleanup();
  }, []);

  return (
    <Screen style={{ justifyContent: "center" }}>
      <CustomText h2 fontWeight="bold" style={{ marginBottom: 20 }}>
        Opening ...
      </CustomText>
      <ActivityIndicator color={theme.text.dark} size="large" />
    </Screen>
  );
}

export default withTheme(ResolveAuthScreen);
