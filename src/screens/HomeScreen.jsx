import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, View, ScrollView, TouchableOpacity } from 'react-native';
import { withTheme, FAB } from 'react-native-elements';
import { MaterialIcons } from "@expo/vector-icons";
import MenuDrawer from "react-native-side-drawer";
import { signUserOut, getUser } from '../api/firebase';
import { Screen, CustomText, IntakesProgress, Calendar, CustomButton, IntakesList } from '../components';
import { setUserData } from '../actions/user';
import { SafeAreaView } from 'react-native';

const HomeScreen = ({ navigation, theme }) => {
    const dispatch = useDispatch();
    const [drawerOpen, setDrawerOpen] = useState(false);
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

    const drawerContent = () => {
    return (
      <View style={{ backgroundColor: theme.background.secondary, height: "100%", paddingTop: 75, paddingHorizontal: 25 }}>
        <TouchableOpacity onPress={() => setDrawerOpen(false)} style={{ flexDirection: "row", alignItems: "center", padding: 15, paddingLeft: 0 }}>
          <MaterialIcons name="close" size={30} color={theme.text.dark} style={{ marginBottom: 30, marginLeft: -4 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={signUserOut} style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialIcons name="logout" size={24} color={theme.text.dark} style={{ marginRight: 5 }} />
          <CustomText fontWeight="medium" style={{ fontSize: 18 }}>Logout</CustomText>
        </TouchableOpacity>
      </View>
    );
  };
    
    return (
      <MenuDrawer 
        open={drawerOpen} 
        drawerContent={drawerContent()} 
        opacity={0.2}
        animationTime={250}
        overlay
        drawerPercentage={85}
      >
        <Screen>
          <View style={{ alignSelf: "flex-start", width: "100%", display: "flex", flexDirection: "row", alignItems: "center", marginTop: 15 }}>
            <TouchableOpacity onPress={() => setDrawerOpen(true)} style={{ padding: 15, paddingLeft: 0 }}>
              <MaterialIcons name="menu" size={24} color={theme.text.dark} />
            </TouchableOpacity>
            <View style={{ marginLeft: "auto", backgroundColor: theme.text.dark, borderRadius: 50, height: 50, width: 50, display: "flex", justifyContent: "center", alignItems: "center" }}>
              <CustomText style={{ color: theme.background.white, fontSize: 25 }}>{user?.name?.[0]}</CustomText>
            </View>
          </View>
          <Calendar />
          <ScrollView bounces={false} style={{ width: "100%" }} contentContainerStyle={{ alignItems: "center" }} showsVerticalScrollIndicator={false}>
            <IntakesProgress />
            <IntakesList />
          </ScrollView>
          <FAB 
            title="+" 
            placement="right" 
            color={theme.background.orange} 
            titleStyle={{ color: theme.text.dark, fontSize: 25, fontFamily: "bold" }} 
            buttonStyle={{ borderRadius: "50%"}} 
            onPress={() => navigation.navigate("Add")}
          />
        </Screen>
      </MenuDrawer>
    );
}

export default withTheme(HomeScreen);
