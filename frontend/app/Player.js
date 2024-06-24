import { View, Text, Image, TouchableOpacity, Button } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import Footer from "./components/footer";
import { useNavigation } from "@react-navigation/native";
import Dashboard from "./Dashboard";

const Player = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{ flex: 1, alignItems: "center", marginTop: 50, marginBottom: 50 }}
    >
      <Image
        source={{
          uri: "https://rocketium.com/is/wp-content/uploads/2021/04/undraw_compose_music_ovo2.png",
        }}
        style={{ width: 200, height: 200, borderRadius: 100 }}
      />
      <View style={{ marginTop: 50, marginBottom: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Name of the Audio
        </Text>
      </View>
      <View style={{ marginBottom: 30 }}>
        <Text>Artist</Text>
      </View>
      <TouchableOpacity
        style={{ backgroundColor: "#3E8B9A", borderRadius: 100, padding: 10 }}
        onPress={() => {}}
      >
        <Icon name="pause" size={20} color="#fff" />
      </TouchableOpacity>
      <View style={{ marginTop: 50, alignItems: "center" }}>
        <Button
          title="Go to Dashboard"
          onPress={() => navigation.navigate("Dashboard")}
          color="#3E8B9A"
        />
      </View>
      <View style={{ alignItems: "center", marginTop: 120 }}>
        <Footer />
      </View>
    </View>
  );
};

export default Player;
