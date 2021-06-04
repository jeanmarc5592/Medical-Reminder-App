import * as React from "react";
import { withTheme } from "react-native-elements";
import Svg, { Path } from "react-native-svg";

const InfoIcon = ({ theme, ...restProps}) => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={21.1} height={24.156} viewBox="0 0 21.1 24.156" {...restProps}>
      <Path
        data-name="Pfad 12"
        d="M10.55 0a10.55 10.55 0 00-5.081 19.8l-.124 4.36 4.978-3.068c.075 0 .15.012.227.012a10.55 10.55 0 100-21.1zm1.339 16.7h-2.7V8h2.7zm-1.365-9.77a1.322 1.322 0 01-1.405-1.354 1.322 1.322 0 011.423-1.371 1.365 1.365 0 11-.018 2.724z"
        fill={theme.text.dark}
      />
    </Svg>
  );
}

export default withTheme(InfoIcon);
