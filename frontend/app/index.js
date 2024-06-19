import { View, Text, Button } from "react-native";
import Login from "./Login";
import SignUp from "./SignUp";
import EmoicLogo from "./svgs/EmoicLogo";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();
  return (
    <View>
      <View style={{ marginBottom: 100, alignItems: "center" }}>
        <EmoicLogo style={{ width: 100, height: 100 }} />
      </View>
      <Text>Let the music reflect the emotions..</Text>
      <Button
        title="Continue"
        onPress={() => navigation.navigate("Login")}
        color={"#3E8B9A"}
      />
    </View>
  );
};

export default Home;
