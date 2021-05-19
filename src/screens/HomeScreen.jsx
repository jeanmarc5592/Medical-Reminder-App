import React from 'react'
import { signUserOut } from '../api/firebase';
import { Screen, CustomText, CustomButton } from '../components';

const HomeScreen = ({ navigation }) => {
    const handleSignOut = () => {
        signUserOut();

    }

    return (
        <Screen>
            <CustomText>Hello from HomeScreen</CustomText>
            <CustomButton title="Log Out" onPress={handleSignOut}  />
        </Screen>
    )
}

export default HomeScreen
