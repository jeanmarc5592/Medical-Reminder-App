import * as React from "react";
import { withTheme } from "react-native-elements";
import Svg, { G, Path } from "react-native-svg";

const TabletIcon = props => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={28.586} height={28.58} viewBox="0 0 28.586 28.58" {...props}>
      <G data-name="drugs (1)">
        <G data-name="Gruppe 6">
          <G data-name="Gruppe 5">
            <Path data-name="Pfad 5" d="M6.785 7.22a10.138 10.138 0 00-.58 13.406l13.96-14.442a10.138 10.138 0 00-13.38 1.035z" fill={props.theme.text.iconLight} />
          </G>
        </G>
        <G data-name="Gruppe 8">
          <G data-name="Gruppe 7">
            <Path data-name="Pfad 6" d="M21.995 7.953L8.035 22.395a10.116 10.116 0 0013.96-14.442z" fill={props.theme.text.iconLight} />
          </G>
        </G>
      </G>
    </Svg>
  );
}

export default withTheme(TabletIcon);
