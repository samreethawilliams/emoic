import * as React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Circle, LinearGradient, Stop, G } from "react-native-svg";

const Bg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 800 800"
  >
    <rect fill="#C4E0E5" width="800" height="800" />
    <g fill-opacity="0.29">
      <circle fill="#C4E0E5" cx="400" cy="400" r="600" />
      <circle fill="#aed3da" cx="400" cy="400" r="500" />
      <circle fill="#97c7cf" cx="400" cy="400" r="400" />
      <circle fill="#80bac4" cx="400" cy="400" r="300" />
      <circle fill="#67adba" cx="400" cy="400" r="200" />
      <circle fill="#4CA1AF" cx="400" cy="400" r="100" />
    </g>
  </svg>
);

export default Bg;
