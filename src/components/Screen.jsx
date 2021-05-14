import React from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { withTheme } from 'react-native-elements'

const Screen = ({ theme, children, style: customStyles = {} }) => {
    const defaultStyles = {
      flex: 1,
      backgroundColor: theme.background.primary,
      paddingHorizontal: 20
    };
    const styles = [defaultStyles, customStyles]

    return (
        <SafeAreaView style={styles}>
            {children}
        </SafeAreaView>
    )
}

export default withTheme(Screen)
