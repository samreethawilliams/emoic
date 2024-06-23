import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";

const player = () => {
  return (
    <View
      style={{ flex: 1, alignItems: "center", marginTop: 20, marginBottom: 20 }}
    >
      <Image
        source={{
          uri: "https://rocketium.com/is/wp-content/uploads/2021/04/undraw_compose_music_ovo2.png",
        }}
        style={{ width: 100, height: 100, borderRadius: 75 }}
      />
      <View style={{ marginTop: 20, marginBottom: 20 }}>
        <Text>Name of the Audio</Text>
      </View>
      <View style={{ marginTop: 20, marginBottom: 20 }}>
        <Text>Artist</Text>
      </View>
      <TouchableOpacity
        style={{ backgroundColor: "#3E8B9A", borderRadius: 75 }}
        onPress={() => {}}
      >
        <Icon name="Pause" size={50} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default player;
