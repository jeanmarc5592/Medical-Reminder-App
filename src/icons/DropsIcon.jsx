import * as React from "react";
import { withTheme } from "react-native-elements";
import Svg, { G, Path } from "react-native-svg";

const DropsIcon = props => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={26.212} height={30.312} viewBox="0 0 26.212 30.312" {...props}>
      <G data-name="Gruppe 18">
        <G fill={props.theme.text.iconLight}>
          <Path data-name="Pfad 8" d="M19.836 10.068l-3.7-3.7-9.88 9.89c-1.026 1.027-2.359 4.016-1.338 5.035s4.016-.319 5.037-1.337zm0 0" />
          <Path
            data-name="Pfad 9"
            d="M25.445.766a2.613 2.613 0 00-3.7 0l-3.76 3.762-1.539-1.541a.726.726 0 10-1.026 1.027l6.773 6.76a.726.726 0 001.026-1.027l-1.54-1.54 3.766-3.743a2.613 2.613 0 000-3.7zm0 0"
          />
        </G>
        <G data-name="Gruppe 9">
          <Path
            data-name="Pfad 10"
            d="M3.205 23.687c-.16-.191-.313-.366-.45-.527-.137.168-.29.343-.45.527C1.336 24.801 0 26.35 0 27.56a2.714 2.714 0 00.809 1.946 2.745 2.745 0 001.946.809 2.714 2.714 0 001.945-.813 2.759 2.759 0 00.81-1.942c0-1.21-1.335-2.752-2.305-3.873z"
            fill={props.theme.text.iconLight}
          />
        </G>
      </G>
    </Svg>
  );
}

export default withTheme(DropsIcon);
