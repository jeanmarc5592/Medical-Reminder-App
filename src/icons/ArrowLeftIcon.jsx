import * as React from "react";
import { withTheme } from "react-native-elements";
import Svg, { Path } from "react-native-svg";

const ArrowLeftIcon = ({ theme, ...restProps }) => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={12.092} height={21.212} viewBox="0 0 12.092 21.212" {...restProps}>
      <Path
        data-name="Pfad 13"
        d="M.43 9.556L9.551.435a1.485 1.485 0 012.1 2.1l-8.071 8.07 8.07 8.07a1.485 1.485 0 01-2.1 2.1L.43 11.656a1.485 1.485 0 010-2.1z"
        fill={theme.text.dark}
      />
    </Svg>
  );
}

export default withTheme(ArrowLeftIcon);
