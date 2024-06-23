import { View, Text, Button } from "react-native";
import Login from "./Login";
import SignUp from "./SignUp";
import player from "./player";
import EmoicLogo from "./svgs/EmoicLogo";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();
  return (
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
          fontWeight: "semibold",
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
        onPress={() => navigation.navigate("player")}
        color="#3E8B9A"
      />
    </View>
  );
};

export default Home;
