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
import { TRANSCRIBE_SERVER, UPLOAD_SERVER } from "./utils/constants";
import Toast from "react-native-root-toast";
import { useNavigation } from "@react-navigation/native";
import { RootSiblingParent } from "react-native-root-siblings";
import { FontAwesome } from "@expo/vector-icons";
import NothingHere from "./svgs/NothingHere";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [audioHistory, setAudioHistory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [transcribeLoading, setTranscribeLoading] = useState(false);
  const navigation = useNavigation();

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

  const transcribe = async (fileName, fileUri) => {
    console.log(fileName, fileUri);

    setTranscribeLoading(true);

    const [file] = fileName.split(".mp3");

    console.log({
      audioName: `${file}.wav`,
      originalAudioFile: fileName,
      userId: user.id,
      fileUri,
      saveToHistory: false,
    });

    try {
      const fetchCall = await fetch(`${TRANSCRIBE_SERVER}/transcribe`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          audioName: `${file}.wav`,
          originalAudioFile: fileName,
          userId: user.id,
          fileUri,
          saveToHistory: false,
        }),
      });
      const res = await fetchCall.json();
      console.log("response from /transcribe: ", res);

      if (
        res.message === "Some error occured" ||
        res.message === "Some database error occurred"
      ) {
        Toast.show(res.message + ". Please try again.", {
          duration: Toast.durations.SHORT,
        });
      }

      if (res.status === true) {
        navigation.navigate("Player", {
          audioName: fileName,
          audioAuthor: user.name ?? "Unknown",
          fileUri: fileUri,
          transcript: res.transcript,
        });
      }

      // success
    } catch (error) {
      console.error(error);
    } finally {
      setTranscribeLoading(false);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => transcribe(item.name, item.fileuri)}>
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
            <Text
              style={{ fontSize: 14, fontWeight: "bold", color: "#807e7e" }}
            >
              Audio Name
            </Text>
            <Text style={{ fontSize: 16, marginTop: 8, color: "#000000" }}>
              {item.name}
            </Text>
          </View>
          <Text style={{ fontSize: 24 }}>{item.emotion}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <RootSiblingParent>
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
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                marginBottom: 25,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginTop: 10,
                }}
              >
                History
              </Text>
              <TouchableOpacity
                onPress={getHistory}
                style={{
                  backgroundColor: "#3E8B9A",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 8,
                  padding: 12,
                  marginLeft: "auto",
                }}
              >
                <FontAwesome name={"refresh"} size={23} color="white" />
              </TouchableOpacity>
            </View>
            {!audioHistory || (audioHistory && audioHistory.length === 0) ? (
              <View
                style={{ marginTop: 15, display: "flex", alignItems: "center" }}
              >
                <Text
                  style={{
                    fontSize: 15,
                  }}
                >
                  Oops, no history currently available to display
                </Text>
                <NothingHere
                  style={{ width: 160, height: 160, marginTop: 25 }}
                />
                {loading ? (
                  <ActivityIndicator
                    size="small"
                    color="#3E8B9A"
                    style={{ marginTop: 30 }}
                  />
                ) : null}
              </View>
            ) : transcribeLoading ? (
              <View
                style={{
                  marginBottom: 20,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator
                  size="small"
                  color="#3E8B9A"
                  style={{ marginTop: 30 }}
                />
                <Text style={{ color: "#807e7e", fontSize: 16, marginTop: 20 }}>
                  Detecting emotions...
                </Text>
              </View>
            ) : (
              <View
                style={{
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
    </RootSiblingParent>
  );
};

export default Dashboard;
