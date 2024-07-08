import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  ScrollView,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import Footer from "./components/footer";
import { useNavigation } from "@react-navigation/native";
import Dashboard from "./Dashboard";
import Slider from "@react-native-community/slider";
import Bg from "./svgs/Bg";

const Player = () => {
  const navigation = useNavigation();
  const lyrics =
    "Twinkle, twinkle, little star,How I wonder what you are!Up above the world so high,Like a diamond in the sky.";
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
      <Bg style={{ height: 1000, width: 1000 }} />
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
        style={{ width: 200, height: 40 }}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        disabled={true}
      />
      <TouchableOpacity
        style={{
          backgroundColor: "#3E8B9A",
          borderRadius: 100,
          padding: 20,
          marginBottom: 10,
        }}
        onPress={() => {}}
      >
        <Icon name="pause" size={30} color="#fff" />
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
          padding: 10,
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
