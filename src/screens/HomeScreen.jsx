import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, View, ScrollView } from 'react-native';
import { withTheme } from 'react-native-elements';
import { MaterialIcons } from "@expo/vector-icons";
import { signUserOut, getUser } from '../api/firebase';
import { Screen, CustomText, IntakesProgress, Calendar, CustomButton, IntakesList } from '../components';
import { setUserData } from '../actions/user';

const HomeScreen = ({ navigation, theme }) => {
    const dispatch = useDispatch();
    const { user, calendar, intakes } = useSelector(state => state);

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
    }, [calendar?.selectedDay, user?.newMedicineTaken, intakes?.editedIntake]);
    
    return (
      <Screen>
        <View style={{ alignSelf: "flex-start", width: "100%", display: "flex", flexDirection: "row", alignItems: "center", marginTop: 15 }}>
          <MaterialIcons name="menu" size={24} color={theme.text.dark} />
          <View style={{ marginLeft: "auto", backgroundColor: theme.text.dark, borderRadius: 50, height: 50, width: 50, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CustomText style={{ color: theme.background.white, fontSize: 25 }}>{user?.name?.[0]}</CustomText>
          </View>
        </View>
        <Calendar />
        <ScrollView bounces={false} style={{ width: "100%" }} contentContainerStyle={{ alignItems: "center" }} showsVerticalScrollIndicator={false}>
          <IntakesProgress />
          <IntakesList />
        </ScrollView>
        <CustomButton title="Log Out" onPress={signUserOut} />
      </Screen>
    );
}

export default withTheme(HomeScreen);
