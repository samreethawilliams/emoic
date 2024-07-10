import * as React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Circle, LinearGradient, Stop, G } from "react-native-svg";

const Bg = () => (
  <View style={StyleSheet.absoluteFillObject}>
    <Svg height="100%" width="100%">
      <LinearGradient id="grad" x1="0" y1="0" x2="100%" y2="0">
        <Stop offset="0%" stopColor="#4ca1af" />
        <Stop offset="100%" stopColor="#c4e0e5" />
      </LinearGradient>
      <G>
        <Circle cx="50%" cy="50%" r="70%" fill="url(#grad)" />
        <G opacity="0.5">
          <Circle cx="50%" cy="50%" r="60%" fill="url(#grad)" />
          <Circle cx="50%" cy="50%" r="50%" fill="url(#grad)" />
          <Circle cx="50%" cy="50%" r="40%" fill="url(#grad)" />
          <Circle cx="50%" cy="50%" r="30%" fill="url(#grad)" />
          <Circle cx="50%" cy="50%" r="20%" fill="url(#grad)" />
        </G>
      </G>
    </Svg>
  </View>
);

export default Bg;
