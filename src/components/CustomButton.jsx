import React from 'react'
import { Button, withTheme } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';

const CustomButton = ({ 
    theme, 
    containerStyle: customContainerStyle = {},
    buttonStyle: customButtonStyle = {}, 
    titleStyle: customTitleStyle = {},
    raised = true,
    ...buttonProps 
}) => {
    const defaultContainerStyles = { width: "100%" };
    const defaultButtonStyles = { backgroundColor: theme.background.secondary, paddingVertical: 12 };
    const defaultTitleStyles = { color: theme.text.dark, fontFamily: "bold" };

    return (
        <Button 
            TouchableComponent={TouchableOpacity}
            containerStyle={{ ...defaultContainerStyles, ...customContainerStyle }}
            buttonStyle={{ ...defaultButtonStyles, ...customButtonStyle }} 
            titleStyle={{ ...defaultTitleStyles, ...customTitleStyle }}
            loadingProps={{ color: theme.text.dark }}
            {...buttonProps}
            raised={raised}
        />
    )
}

export default withTheme(CustomButton);
