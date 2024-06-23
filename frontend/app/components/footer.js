import { View, Text } from "react-native";
import React from "react";

const Footer = () => {
  return (
    <View style={{ position: "absolute", alignItems: "center" }}>
      <Text style={{ fontSize: 14, marginBottom: 10 }}>Enjoy the mood..</Text>
      <View
        style={{
          width: 150,
          height: 4,
          backgroundColor: "grey",
          borderRadius: 2,
        }}
      ></View>
    </View>
  );
};

export default Footer;
