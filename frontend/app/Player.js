import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import Footer from "./components/footer";

const Player = () => {
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
          require("../assets/sounds/sample.mp3"),
          {},
          (status) => setPlaybackStatus(status),
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
      colors={["#3E8B9A", "#F0F0F0"]}
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          marginTop: 50,
          marginBottom: 50,
          borderRadius: 30,
          padding: 20,
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 100,
            padding: 5,
            alignItems: "center",
          }}
        >
          <Image
            source={{
              uri: "https://cdn.pixabay.com/photo/2017/03/05/21/55/emoticon-2120024_640.png",
            }}
            style={{ width: 200, height: 200, borderRadius: 100 }}
          />
        </View>
        <View style={{ marginTop: 30, marginBottom: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Name of the Audio
          </Text>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text>Artist</Text>
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
            <MaterialIcons
              name={isPlaying ? "pause-circle" : "play-circle"}
              size={60}
              color="#3E8B9A"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginBottom: 10,
            }}
            onPress={() => navigation.navigate("Dashboard")}
          >
            <MaterialIcons name="dashboard" size={60} color="#3E8B9A" />
          </TouchableOpacity>
        </View>
        <ScrollView
          style={{
            marginTop: 30,
            backgroundColor: "#F0F0F0",
            borderRadius: 20,
            padding: 20,
            height: 300,
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
        <View style={{ alignItems: "center", marginTop: 120 }}>
          <Footer />
        </View>
      </View>
    </LinearGradient>
  );
};

export default Player;
