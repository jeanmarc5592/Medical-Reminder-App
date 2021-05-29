import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, View } from 'react-native';
import { withTheme } from 'react-native-elements';
import { signUserOut, getUser } from '../api/firebase';
import { Screen, CustomText, CustomButton, Calendar } from '../components';
import { setUserData } from '../actions/user';

const HomeScreen = ({ navigation, theme }) => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state);
    const date = new Date();

    useEffect(() => {
        const onSuccess = userData => dispatch(setUserData(userData));
        const showAlert = () => {
            Alert.alert(
                'Something wrent wrong getting your data. You will be logged out safely',
                '',
                [ { text: "Ok", onPress: () => signUserOut(), style: "cancel" } ],
            )
        }
        getUser(onSuccess, showAlert)
    }, []);
    
    return (
      <Screen>
        <View style={{ alignSelf: "flex-start", width: "100%", display: "flex", flexDirection: "row", alignItems: "center", marginTop: 15 }}>
          <CustomText h3 fontWeight="bold">
            Hello {user?.name}!
          </CustomText>
          <View style={{ marginLeft: "auto", backgroundColor: theme.text.dark, borderRadius: "50%", height: 50, width: 50, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CustomText style={{ color: theme.background.white, fontSize: 25 }}>{user?.name?.[0]}</CustomText>
          </View>
        </View>
        <Calendar date={date} />
        {/* <CustomButton title="Log Out" onPress={signUserOut} /> */}
      </Screen>
    );
}

export default withTheme(HomeScreen);
