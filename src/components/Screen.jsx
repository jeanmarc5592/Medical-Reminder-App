import React from 'react';
import { Platform } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { withTheme } from 'react-native-elements';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Screen = ({ theme, children, style: customStyles = {} }) => {
    const defaultStyles = {
      flex: 1,
      backgroundColor: theme.background.primary,
      paddingHorizontal: 20
    };
    const styles = [defaultStyles, customStyles]

    return (
        <SafeAreaView style={styles}>
            <KeyboardAwareScrollView 
                showsVerticalScrollIndicator={Platform.OS === "android" ? true : false}
                bounces={false} 
                contentContainerStyle={{ alignItems: "center" }} 
                style={{ flex: 1, width: "100%" }} 
                extraHeight={160}
            >
                {children}
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

export default withTheme(Screen)
