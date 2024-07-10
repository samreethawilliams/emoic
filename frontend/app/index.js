import { View, Text, Button, StyleSheet } from "react-native";
import Login from "./Login";
import SignUp from "./SignUp";
import EmoicLogo from "./svgs/EmoicLogo";
import Bg from "./svgs/Bg";
import { useNavigation } from "@react-navigation/native";
import Player from "./Player";

const Home = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <Bg style={StyleSheet.absoluteFillObject} />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 16,
        }}
      >
        <View style={{ marginBottom: 100, alignItems: "center" }}>
          <EmoicLogo style={{ width: 120, height: 120 }} />
        </View>
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 50,
          }}
        >
          Let the music reflect the emotions..
        </Text>
        <Button
          title="Continue"
          onPress={() => navigation.navigate("Login")}
          color="#3E8B9A"
        />
        <Button
          title="AudioPlayer"
          onPress={() => navigation.navigate("Player")}
          color="#3E8B9A"
        />
      </View>
    </View>
  );
};

export default Home;
