import { View, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const Footer = () => {
  const navigation = useNavigation();

  const handleDashboardPress = () => {
    navigation.navigate("Dashboard");
  };

  const handleUploadPress = () => {
    navigation.navigate("AudioRecord");
  };

  const handleLogoutPress = () => {
    navigation.navigate("Login");
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
        padding: 20,
        borderTopWidth: 1,
        borderColor: "#ccc",
      }}
    >
      <TouchableOpacity onPress={handleDashboardPress}>
        <Ionicons name="home" size={30} color="#3E8B9A" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleUploadPress}>
        <Ionicons name="add-circle" size={30} color="#3E8B9A" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogoutPress}>
        <Ionicons name="log-out" size={30} color="#3E8B9A" />
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
