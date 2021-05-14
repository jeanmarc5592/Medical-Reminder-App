import React from 'react'
import { Text, withTheme } from 'react-native-elements';


const CustomText = ({ theme, children, style: customStyles = {}, color = "dark", fontWeight = "regular", ...textProps }) => {
    const defaultStyles = {
        // color choices: dark,light,green,red
        color: theme.text[color],
        // fontFamily choices: light,regular,medium,bold
        fontFamily: fontWeight
    };
    const styles = [defaultStyles, customStyles];

    return (
        <Text style={styles} {...textProps}>
            {children}
        </Text>
    )
}

export default withTheme(CustomText);
