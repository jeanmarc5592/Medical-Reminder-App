import React from 'react'
import { Input, withTheme } from 'react-native-elements';

const CustomInput = ({ theme, inputStyle = {}, leftIconContainerStyle = {}, containerStyle = {}, ...inputProps}) => {
    
    return (
        <Input 
            inputStyle={[{ color: theme.text.dark }, inputStyle]} 
            containerStyle={[{ marginBottom: 10 }, containerStyle]}
            leftIconContainerStyle={[{ marginRight: 10 }, leftIconContainerStyle]}
            {...inputProps} 
        />
    )
};

export default withTheme(CustomInput);
