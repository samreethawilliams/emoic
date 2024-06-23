import { View, Text, FlatList } from "react-native";
import React from "react";
import Footer from "./components/footer";

const dashboard = () => {
  const audioHistory = [
    { id: "1", name: "Audio File 1" },
    { id: "2", name: "Audio File 2" },
    { id: "3", name: "Audio File 3" },
    { id: "4", name: "Audio File 4" },
    { id: "5", name: "Audio File 5" },
  ];

  const renderItem = ({ item }) => (
    <View>
      <Text>{item.name}</Text>
    </View>
  );
  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginBottom: 20, marginTop: 20 }}>
        <Text style={{ fontWeight: "bold" }}>Hi, Joel</Text>
      </View>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
        Audio History
      </Text>
      <FlatList
        data={audioHistory}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <View style={{ alignItems: "center" }}>
        <Footer />
      </View>
    </View>
  );
};

export default dashboard;
