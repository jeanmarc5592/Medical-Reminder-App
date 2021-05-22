import React, { useEffect } from 'react'
import { ActivityIndicator } from 'react-native';
import * as firebase from 'firebase';
import { Screen } from '../components';

const ResolveAuthScreen = ({ navigation }) => {
  // React to authentication changes and update Data Persistence in SecureStorage accordingly
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
    <Screen>
      <ActivityIndicator />
    </Screen>
  );
}

export default ResolveAuthScreen
