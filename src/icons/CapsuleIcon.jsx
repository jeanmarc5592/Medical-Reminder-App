import * as React from "react";
import { withTheme } from "react-native-elements";
import Svg, { Path } from "react-native-svg";

const CapsuleIcon = props => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={23.721} height={23.722} viewBox="0 0 23.721 23.722" {...props}>
      <Path
        data-name="Pfad 2"
        d="M21.538 2.183c-2.668-2.67-6.739-2.925-9.091-.573L6.042 8.016l-4.433 4.432c-2.352 2.353-2.1 6.423.573 9.093s6.74 2.924 9.092.573l4.432-4.432 6.407-6.406c2.351-2.354 2.094-6.424-.575-9.093zM10.131 20.97c-1.719 1.718-4.771 1.46-6.806-.57s-2.291-5.086-.573-6.805L7.185 9.16l7.378 7.378z"
        fill={props.theme.text.dark}
        opacity={0.563}
      />
    </Svg>
  );
}

export default withTheme(CapsuleIcon);
