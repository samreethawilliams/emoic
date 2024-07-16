import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import EmoicLogo from "./svgs/EmoicLogo";
import Bg from "./svgs/Bg";

const Home = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{ flex: 1, borderColor: "#3E8B9A", borderWidth: 2, padding: 2 }}
    >
      <Bg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          height: "100%",
        }}
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
        }}
      >
        <View style={{ marginBottom: 100, alignItems: "center" }}>
          <EmoicLogo style={{ width: 300, height: 300 }} />
        </View>
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 50,
            marginRight: 20,
            marginLeft: 20,
          }}
        >
          Let the music reflect the emotions..
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("AudioRecord", { id: 5 })}
          style={{
            backgroundColor: "#3E8B9A",
            alignItems: "center",
            justifyContent: "center",
            height: 48,
            borderRadius: 8,
            width: "80%",
          }}
        >
          <Text style={{ color: "#FFFFFF", fontSize: 18, padding: 5 }}>
            Get Started
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Dashboard")}
          style={{
            backgroundColor: "#3E8B9A",
            alignItems: "center",
            justifyContent: "center",
            height: 48,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "#FFFFFF", fontSize: 18 }}>Dashboard</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
