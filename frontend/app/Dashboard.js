import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Footer from "./components/footer";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const audioHistory = [
    { id: "1", name: "Audio File 1", emoticon: "😊" },
    { id: "2", name: "Audio File 2", emoticon: "☹️" },
    { id: "3", name: "Audio File 3", emoticon: "😭" },
    { id: "4", name: "Audio File 4", emoticon: "😡" },
  ];

  const getUserData = async () => {
    const value = await AsyncStorage.getItem("user");
    setUser(JSON.parse(value));
  };

  useEffect(() => {
    getUserData();
  }, []);

  const renderItem = ({ item }) => (
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 8,
        marginBottom: 20,
        width: "100%",
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text style={{ fontSize: 16 }}>{item.name}</Text>
      <Text style={{ fontSize: 24 }}>{item.emoticon}</Text>
    </View>
  );
  const navigation = useNavigation();
  return (
    <View
      style={{ flex: 1, borderColor: "#3E8B9A", borderWidth: 2, padding: 2 }}
    >
      <View
        style={{
          marginBottom: 20,
          marginTop: 20,
        }}
      >
        <Image
          source={{
            uri: "https://c8.alamy.com/zooms/9/d4c59d90389444e3b1166312d2f7fa51/p9mywr.jpg",
          }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 100,
            marginRight: 30,
          }}
        />
        {user ? (
          <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 10 }}>
            Hi, {user.name}
          </Text>
        ) : (
          <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 10 }}>
            Welcome
          </Text>
        )}
        {/* <TouchableOpacity
          style={{ backgroundColor: "#3E8B9A", padding: 6, borderRadius: 100 }}
          onPress={() => {}}
        >
          <Icon name="plus" size={20} color="#fff" />
        </TouchableOpacity> */}
      </View>
      <View
        style={{
          width: "100%",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          History
        </Text>
        <View
          style={{
            marginBottom: 20,
            marginTop: 20,
            alignContent: "center",
          }}
        >
          <Image
            source={{
              uri: "https://c8.alamy.com/zooms/9/d4c59d90389444e3b1166312d2f7fa51/p9mywr.jpg",
            }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 100,
              marginRight: 30,
            }}
          />
          <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 10 }}>
            Hi, Joel
          </Text>
        </View>
        <View
          style={{
            width: "100%",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 20,
            }}
          >
            Audio History
          </Text>
          <View
            style={{
              padding: 10,
              marginBottom: 20,
            }}
          >
            <FlatList
              data={audioHistory}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
        <Footer />
      </View>
    </View>
  );
};

export default Dashboard;
