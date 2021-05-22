import React from 'react'
import { signUserOut } from '../api/firebase';
import { Screen, CustomText, CustomButton } from '../components';

const HomeScreen = () => {
    
    return (
        <Screen>
            <CustomText>Hello from HomeScreen</CustomText>
            <CustomButton title="Log Out" onPress={signUserOut}  />
        </Screen>
    )
}

export default HomeScreen
