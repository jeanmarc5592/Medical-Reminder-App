import React from 'react'
import { MaterialIcons } from "@expo/vector-icons";
import { withTheme, SocialIcon } from 'react-native-elements';
import { TouchableOpacity, View } from 'react-native';
import { Screen, CustomText, CustomInput, CustomButton } from '../components';

const LoginScreen = ({ navigation, theme }) => {

    return (
        <Screen style={{ alignItems: "center" }}>
            <CustomText h2 fontWeight="bold" style={{ marginTop: 50 }}>
                Welcome Back!
            </CustomText>
            <CustomText style={{ marginTop: 15, fontSize: 18, marginBottom: 80 }}>
                Sign in to your account
            </CustomText>
            <CustomInput 
                leftIcon={<MaterialIcons name="email" size={24} color={theme.text.dark} />} 
                placeholder="Enter your Email" 
            />
            <CustomInput 
                leftIcon={<MaterialIcons name="lock" size={24} color={theme.text.dark} />} 
                placeholder="Enter your Password" 
                secureTextEntry
            />
            <CustomButton containerStyle={{ marginBottom: 15 }} onPress={() => console.log("Log in!")} title="Continue" />
            <SocialIcon 
                title="Sign in with Google" 
                button 
                light 
                type="google" 
                style={{ borderRadius: 0, width: "100%" }} 
                fontStyle={{ fontSize: 18, color: theme.text.dark, fontWeight: "700" }}
                iconStyle={{ color: theme.text.dark }}
                onPress={() => console.log("Sign in with Google")}
            />
            <View style={{ display: "flex", flexDirection: "row", marginTop: 40}}>
                <CustomText>
                    Don't have an account?&nbsp;
                </CustomText>
                <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                    <CustomText style={{ textDecorationLine: "underline" }} fontWeight="bold">
                        Sign up!
                    </CustomText>
                </TouchableOpacity>
            </View>
        </Screen>
    )
}

export default withTheme(LoginScreen);
