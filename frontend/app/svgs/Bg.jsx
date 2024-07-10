import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Svg, Circle, G, Path } from "react-native-svg";

const Bg = (props) => (
  <Svg {...props}>
    <Path fill="#C4E0E5" x="0" y="0" width="800" height="800" />
    <G fillOpacity="0.29">
      <Circle fill="#C4E0E5" cx="400" cy="400" r="600" />
      <Circle fill="#aed3da" cx="400" cy="400" r="500" />
      <Circle fill="#97c7cf" cx="400" cy="400" r="400" />
      <Circle fill="#80bac4" cx="400" cy="400" r="300" />
      <Circle fill="#67adba" cx="400" cy="400" r="200" />
      <Circle fill="#4CA1AF" cx="400" cy="400" r="100" />
    </G>
  </Svg>
);

export default Bg;
