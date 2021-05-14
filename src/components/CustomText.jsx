import React from 'react'
import { Text, withTheme } from 'react-native-elements';


const CustomText = ({ theme, children, style: customStyle = {}, color = "dark", fontWeight = "regular", ...textProps }) => {
    const defaultStyle = {
        // color choices: dark,light,green,red
        color: theme.text[color],
        // fontFamily choices: light,regular,medium,bold
        fontFamily: fontWeight
    };
    const styles = [defaultStyle, customStyle];

    return (
        <Text style={styles} {...textProps}>
            {children}
        </Text>
    )
}

export default withTheme(CustomText);
