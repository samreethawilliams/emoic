import {
  View,
  Text,
  FlatList,
  Button,
  TouchableOpacity,
  Dimensions,
  Image,
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
        marginBottom: 20,
        width: "100%",
        padding: 10,
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
        <Image
          source={{
            uri: "https://c8.alamy.com/zooms/9/d4c59d90389444e3b1166312d2f7fa51/p9mywr.jpg",
          }}
          style={{ width: 50, height: 50, borderRadius: 100, marginRight: 30 }}
        />
        <Text style={{ fontSize: 24, fontWeight: "bold", marginRight: 40 }}>
          Hi, Joel
        </Text>
        {/* <TouchableOpacity
          style={{ backgroundColor: "#3E8B9A", padding: 6, borderRadius: 100 }}
          onPress={() => {}}
        >
          <Icon name="plus" size={20} color="#fff" />
        </TouchableOpacity> */}
      </View>
      <View style={{ width: "100%" }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
          Audio History
        </Text>
        <View style={{ padding: 10, marginBottom: 20 }}>
          <FlatList
            data={audioHistory}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
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

      <View
        style={{
          bottom: 20,
          alignItems: "center",
          right: 20,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#3E8B9A",
            padding: 15,
            borderRadius: 50,
            elevation: 5,
          }}
          onPress={() => {}}
        >
          <Icon name="plus" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center", bottom: 0, width: "100%" }}>
        <Footer />
      </View>
    </View>
  );
};

export default Dashboard;
