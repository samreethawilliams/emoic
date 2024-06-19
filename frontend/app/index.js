import { View, Text, Button } from "react-native";
import Login from "./Login";
import SignUp from "./SignUp";
import EmoicLogo from "./svgs/EmoicLogo";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();
  return (
    <View>
      <EmoicLogo style={{ width: 100, height: 100 }} />
      <Text>Dashboard</Text>
      <Button
        title="Go to Sign Up"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
};

export default Home;
