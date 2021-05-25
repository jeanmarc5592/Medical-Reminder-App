import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from 'react-native';
import { signUserOut, getUser } from '../api/firebase';
import { Screen, CustomText, CustomButton } from '../components';
import { setUserData } from '../actions/user';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const { user }= useSelector(state => state);


    useEffect(() => {
        const onSuccess = userData => dispatch(setUserData(userData));
        const showAlert = () => {
            Alert.alert(
                'Something wrent wrong with getting your data. You will be logged out safely',
                '',
                [ { text: "Ok", onPress: () => signUserOut(), style: "cancel" } ],
            )
        }
        getUser(onSuccess, showAlert)
    }, []);
    
    return (
        <Screen>
            <CustomText>Hello {user?.name}</CustomText>
            <CustomButton title="Log Out" onPress={signUserOut}  />
        </Screen>
    )
}

export default HomeScreen
