import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import Footer from "./components/footer";
import { useNavigation } from "@react-navigation/native";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";

const Player = () => {
  const navigation = useNavigation();
  const lyrics =
    "Twinkle, twinkle, little star,How I wonder what you are!Up above the world so high,Like a diamond in the sky.";

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
    <View
      style={{
        flex: 1,
        alignItems: "center",
        marginTop: 50,
        marginBottom: 50,
        backgroundColor: "#F0F0F0",
        borderRadius: 30,
      }}
    >
      <Image
        source={{
          uri: "https://cdn.pixabay.com/photo/2017/03/05/21/55/emoticon-2120024_640.png",
        }}
        style={{ width: 200, height: 200, borderRadius: 100 }}
      />
      <View style={{ marginTop: 30, marginBottom: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Name of the Audio
        </Text>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text>Artist</Text>
      </View>
      <Slider
        style={{ width: 400, height: 50, marginLeft: 20, marginRight: 20 }}
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
          width: 400,
          marginLeft: 20,
          marginRight: 20,
        }}
      >
        <Text>{getCurrentTime()}</Text>
        <Text>{getDuration()}</Text>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "#3E8B9A",
          borderRadius: 100,
          padding: 20,
          marginBottom: 10,
        }}
        onPress={playPauseSound}
      >
        <Icon name={isPlaying ? "pause" : "play"} size={30} color="#fff" />
      </TouchableOpacity>
      <View style={{ alignItems: "center" }}>
        <Button
          title="Go to Dashboard"
          onPress={() => navigation.navigate("Dashboard")}
          color="#3E8B9A"
        />
      </View>
      <ScrollView
        style={{
          marginTop: 30,
          backgroundColor: "white",
          borderRadius: 20,
          padding: 50,
          height: 300,
        }}
      >
        <Text
          style={{
            fontSize: 14,
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
  );
};

export default Player;
