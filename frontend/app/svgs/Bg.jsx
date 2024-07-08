import * as React from "react";
import { View, StyleSheet } from "react-native";
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Stop,
  G,
  Path,
} from "react-native-svg";

const Bg = () => (
  <View style={StyleSheet.absoluteFillObject}>
    <Svg height="100%" width="100%">
      <Defs>
        <LinearGradient id="grad" x1="0" y1="0" x2="100%" y2="0">
          <Stop offset="0%" stopColor="#4ca1af" />
          <Stop offset="100%" stopColor="#c4e0e5" />
        </LinearGradient>
      </Defs>
      <Circle cx="50%" cy="50%" r="40%" fill="url(#grad)" />
      <G>
        <Path
          d="M1549.2 51.6c-5.4 99.1-20.2 197.6-44.2 293.6c-24.1 96-57.4 189.4-99.3 278.6c-41.9 89.2-92.4 174.1-150.3 253.3c-58 79.2-123.4 152.6-195.1 219c-71.7 66.4-149.6 125.8-232.2 177.2c-82.7 51.4-170.1 94.7-260.7 129.1c-90.6 34.4-184.4 60-279.5 76.3C192.6 1495 96.1 1502 0 1500c96.1-2.1 191.8-13.3 285.4-33.6c93.6-20.2 185-49.5 272.5-87.2c87.6-37.7 171.3-83.8 249.6-137.3c78.4-53.5 151.5-114.5 217.9-181.7c66.5-67.2 126.4-140.7 178.6-218.9c52.3-78.3 96.9-161.4 133-247.9c36.1-86.5 63.8-176.2 82.6-267.6c18.8-91.4 28.6-184.4 29.6-277.4c0.3-27.6 23.2-48.7 50.8-48.4s49.5 21.8 49.2 49.5c0 0.7 0 1.3-0.1 2L1549.2 51.6z"
          fill="url(#grad)"
        />
        <G opacity="0.5">
          <Circle cx="50%" cy="50%" r="25%" fill="url(#grad)" />
          <Circle cx="50%" cy="50%" r="20%" fill="url(#grad)" />
          <Circle cx="50%" cy="50%" r="15%" fill="url(#grad)" />
          <Circle cx="50%" cy="50%" r="12%" fill="url(#grad)" />
          <Circle cx="50%" cy="50%" r="10%" fill="url(#grad)" />
        </G>
      </G>
    </Svg>
  </View>
);

export default Bg;
