import { View, Text, Image } from "react-native";
import React from "react";

const Player = () => {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Image
        source={{
          uri: "https://rocketium.com/is/wp-content/uploads/2021/04/undraw_compose_music_ovo2.png",
        }}
        style={{ width: 100, height: 100 }}
      />
      <Text>Audio Player</Text>
    </View>
  );
};

export default Player;
