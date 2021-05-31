import * as React from "react";
import { withTheme } from "react-native-elements";
import Svg, { Path } from "react-native-svg";

const ClockIcon = props => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={29.836} height={29.836} viewBox="0 0 29.836 29.836" {...props}>
      <Path
        d="M14.918 0a14.918 14.918 0 1014.918 14.918A14.934 14.934 0 0014.918 0zm7.095 22.634a1.242 1.242 0 01-1.758 0l-6.216-6.216a1.238 1.238 0 01-.364-.879v-8.08a1.243 1.243 0 112.486 0v7.566l5.852 5.851a1.242 1.242 0 010 1.758zm0 0"
        fill={props.theme.text.light}
      />
    </Svg>
  );
}

export default withTheme(ClockIcon);
