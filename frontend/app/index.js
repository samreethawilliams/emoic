import { View, Text, Button, TouchableOpacity } from "react-native";
import Login from "./Login";
import SignUp from "./SignUp";
import EmoicLogo from "./svgs/EmoicLogo";
import Bg from "./svgs/Bg";
import { useNavigation } from "@react-navigation/native";
import Player from "./Player";

const Home = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{ flex: 1, borderColor: "#3E8B9A", borderWidth: 5, padding: 5 }}
    >
      {/* <Bg /> */}
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
        }}
      >
        <View style={{ marginBottom: 100, alignItems: "center" }}>
          <EmoicLogo style={{ width: 200, height: 200 }} />
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
        <TouchableOpacity
          onPress={() => navigation.navigate("")}
          style={{
            backgroundColor: "#3E8B9A",
            alignItems: "center",
            justifyContent: "center",
            height: 48,
            borderRadius: 8,
          }}
        >
          <Button
            title="Get Started"
            onPress={() => navigation.navigate("Login")}
            color="#3E8B9A"
          />
        </TouchableOpacity>
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
