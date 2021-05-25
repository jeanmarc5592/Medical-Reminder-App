import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import * as firebase from 'firebase';
import { signUserOut, getUser } from '../api/firebase';
import { Screen, CustomText, CustomButton } from '../components';

const HomeScreen = () => {

    useEffect(() => {
        const logUserData = userData => console.log(userData);
        const showAlert = () => {
                  Alert.alert(
                      'Something wrent wrong with getting your data. You will be logged out safely',
                      '',
                      [
                          {
                              text: "Ok",
                              onPress: () => signUserOut(),
                              style: "cancel"
                          }
                      ],
                  )
              }
        getUser(logUserData, showAlert)
    }, []);
    
    return (
        <Screen>
            <CustomText>Hello from HomeScreen</CustomText>
            <CustomButton title="Log Out" onPress={signUserOut}  />
        </Screen>
    )
}

export default HomeScreen
