import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Dashboard from "../Dashboard";
import AudioRecord from "../AudioRecord";

const Footer = () => {
  const navigation = useNavigation();

  const handleDashboardPress = () => {
    navigation.navigate("Dashboard");
  };

  const handleUploadPress = () => {
    navigation.navigate("AudioRecord");
  };
  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#f8f8f8",
        padding: 10,
        borderTopWidth: 1,
        borderColor: "#ccc",
      }}
    >
      <TouchableOpacity onPress={handleDashboardPress}>
        <Text>Dashboard</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleUploadPress}>
        <Text>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
