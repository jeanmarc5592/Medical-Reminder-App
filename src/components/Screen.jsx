import React from 'react';
import { Platform } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { withTheme } from 'react-native-elements';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Screen = ({ theme, children, containerStyle: customContainerStyles = {}, style: customInnerStyles = {} }) => {
    const defaultContainerStyles = {
      flex: 1,
      backgroundColor: theme.background.primary,
      paddingHorizontal: 20
    };
    const defaultInnerStyles = {
      alignItems: "center",
      flex: 1,
      width: "100%",
    };
    const containerStyles = [defaultContainerStyles, customContainerStyles];
    const innerStyles = [defaultInnerStyles, customInnerStyles];

    return (
        <SafeAreaView style={containerStyles}>
            <KeyboardAwareScrollView 
                showsVerticalScrollIndicator={Platform.OS === "android" ? true : false}
                bounces={false} 
                contentContainerStyle={innerStyles}  
                extraHeight={160}
            >
                {children}
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

export default withTheme(Screen)
