import React from 'react'
import { Button, withTheme } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';

const CustomButton = ({ 
    theme, 
    containerStyle: customContainerStyle = {},
    buttonStyle: customButtonStyle = {}, 
    titleStyle: customTitleStyle = {},
    ...buttonProps 
}) => {
    const defaultContainerStyles = { width: "80%" };
    const defaultButtonStyles = { backgroundColor: theme.background.secondary, paddingVertical: 12 };
    const defaultTitleStyles = { color: theme.text.dark, fontFamily: "bold" };

    return (
        <Button 
            TouchableComponent={TouchableOpacity}
            containerStyle={{ ...defaultContainerStyles, ...customContainerStyle }}
            buttonStyle={{ ...defaultButtonStyles, ...customButtonStyle }} 
            titleStyle={{ ...defaultTitleStyles, ...customTitleStyle }}
            {...buttonProps} 
        />
    )
}

export default withTheme(CustomButton);
