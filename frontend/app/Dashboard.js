import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Footer from "./components/footer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UPLOAD_SERVER } from "./utils/constants";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [audioHistory, setAudioHistory] = useState(null);
  const [loading, setLoading] = useState(false);

  const getUserData = async () => {
    const value = await AsyncStorage.getItem("user");
    setUser(JSON.parse(value));
  };

  useEffect(() => {
    getUserData();
  }, []);

  const getHistory = async () => {
    console.log(user);
    // no user so dont make the call
    if (!user) return;

    setLoading(true);

    try {
      const fetchCall = await fetch(
        `${UPLOAD_SERVER}/audio-history?userId=${user.id}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );
      const res = await fetchCall.json();

      console.log("result from /audio-history: ", res);

      if (res.status) {
        setAudioHistory(res.history);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHistory();
  }, [user]);

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
      <View>
        <Text style={{ fontSize: 14, fontWeight: "bold", color: "#807e7e" }}>
          Audio Name
        </Text>
        <Text style={{ fontSize: 16, marginTop: 8, color: "#000000" }}>
          {item.name}
        </Text>
      </View>
      <Text style={{ fontSize: 24 }}>{item.emotion}</Text>
    </View>
  );

  return (
    <View
      style={{ flex: 1, borderColor: "#3E8B9A", borderWidth: 2, padding: 2 }}
    >
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
          {user ? (
            <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 10 }}>
              Hi, {user.name}
            </Text>
          ) : (
            <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 10 }}>
              Welcome
            </Text>
          )}
        </View>
        <View
          style={{
            width: "100%",
            marginTop: 20,
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
          {!audioHistory || (audioHistory && audioHistory.length === 0) ? (
            <View style={{ marginTop: 20 }}>
              <Text
                style={{
                  fontSize: 15,
                }}
              >
                Oops, no history currently available to display
              </Text>
              {loading ? (
                <ActivityIndicator
                  size="small"
                  color="#3E8B9A"
                  style={{ marginTop: 30 }}
                />
              ) : (
                <TouchableOpacity
                  onPress={getHistory}
                  style={{
                    backgroundColor: "#3E8B9A",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 48,
                    borderRadius: 8,
                    width: "100%",
                    marginTop: 10,
                  }}
                >
                  <Text style={{ color: "#FFFFFF", fontSize: 18, padding: 5 }}>
                    Refresh
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
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
          )}
        </View>
        <Footer />
      </View>
    </View>
  );
};

export default Dashboard;
