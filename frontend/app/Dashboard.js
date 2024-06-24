import {
  View,
  Text,
  FlatList,
  Button,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import Player from "./Player";
import { useNavigation } from "@react-navigation/native";
import Footer from "./components/footer";
import Icon from "react-native-vector-icons/FontAwesome";

const Dashboard = () => {
  const audioHistory = [
    { id: "1", name: "Audio File 1" },
    { id: "2", name: "Audio File 2" },
    { id: "3", name: "Audio File 3" },
    { id: "4", name: "Audio File 4" },
    { id: "5", name: "Audio File 5" },
  ];

  const renderItem = ({ item }) => (
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 8,
        marginBottom: 8,
        width: "100%",
      }}
    >
      <Text>{item.name}</Text>
    </View>
  );
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        padding: 20,
      }}
    >
      <View
        style={{
          marginBottom: 20,
          marginTop: 20,
          flexDirection: "row",
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "bold", marginRight: 40 }}>
          Hi, Joel
        </Text>
        <TouchableOpacity
          style={{ backgroundColor: "#3E8B9A", padding: 6, borderRadius: 100 }}
          onPress={() => {}}
        >
          <Icon name="plus" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={{ width: "100%" }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
          Audio History
        </Text>
        <FlatList
          data={audioHistory}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <View
          style={{ marginTop: 10, alignItems: "center", marginBottom: 250 }}
        >
          <Button
            title="AudioPlayer"
            onPress={() => navigation.navigate("Player")}
            color="#3E8B9A"
          />
        </View>
      </View>
      <View style={{ alignItems: "center", bottom: 0 }}>
        <Footer />
      </View>
    </View>
  );
};

export default Dashboard;
