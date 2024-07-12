import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
// import Footer from "./components/footer";
import { useRoute } from "@react-navigation/native";

const Player = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const lyrics =
    "Twinkle, twinkle, little star,   How I wonder what you are! Up above the world so high, Like a diamond in the sky.";

  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackStatus, setPlaybackStatus] = useState(null);

  async function playPauseSound() {
    if (isPlaying) {
      console.log("Pausing Sound");
      await sound.pauseAsync();
      setIsPlaying(false);
    } else {
      if (sound) {
        console.log("Resuming Sound");
        await sound.playAsync();
      } else {
        console.log("Loading Sound");
        const { sound } = await Audio.Sound.createAsync(
          { uri: route.params.fileUri },
          {},
          (status) => {
            console.log("playback status: ", playbackStatus);
            setPlaybackStatus(status);
          },
        );
        setSound(sound);
        console.log("Playing Sound");
        await sound.playAsync();
      }
      setIsPlaying(true);
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const getSliderValue = () => {
    if (playbackStatus && playbackStatus.durationMillis) {
      return playbackStatus.positionMillis / playbackStatus.durationMillis;
    }
    return 0;
  };

  const getCurrentTime = () => {
    if (playbackStatus) {
      const minutes = Math.floor(playbackStatus.positionMillis / 60000);
      const seconds = Math.floor(
        (playbackStatus.positionMillis % 60000) / 1000,
      );
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }
    return "0:00";
  };

  const getDuration = () => {
    if (playbackStatus) {
      const minutes = Math.floor(playbackStatus.durationMillis / 60000);
      const seconds = Math.floor(
        (playbackStatus.durationMillis % 60000) / 1000,
      );
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }
    return "0:00";
  };

  return (
    <LinearGradient
      colors={["#A3CFD4", "#FFFFFF"]}
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
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
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 200 }}>😊</Text>
        </View>
        <View style={{ marginTop: 30, marginBottom: 5 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {route.params.audioName}
          </Text>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text>{route.params.audioAuthor}</Text>
        </View>
        <Slider
          style={{ width: 300, height: 50, marginLeft: 20, marginRight: 20 }}
          minimumValue={0}
          maximumValue={1}
          value={getSliderValue()}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#3E8B9A"
          disabled={true}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 300,
            marginLeft: 20,
            marginRight: 20,
          }}
        >
          <Text>{getCurrentTime()}</Text>
          <Text>{getDuration()}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          <TouchableOpacity
            style={{
              marginRight: 20,
            }}
            onPress={playPauseSound}
          >
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: "white",
                alignItems: "center",
              }}
            >
              <MaterialIcons
                name={isPlaying ? "pause-circle" : "play-circle"}
                size={60}
                color="#3E8B9A"
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginBottom: 10,
            }}
            onPress={() => navigation.navigate("Dashboard")}
          >
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialIcons name="dashboard" size={50} color="#3E8B9A" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 30 }}>
          <ScrollView
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 10,
              padding: 10,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                textAlign: "center",
              }}
            >
              {lyrics}
            </Text>
          </ScrollView>
        </View>
        {/* <Footer /> */}
      </View>
    </LinearGradient>
  );
};

export default Player;
