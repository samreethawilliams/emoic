import { View, Text, Button } from "react-native";
import Login from "../app/pages/Login";
import SignUp from "../app/pages/SignUp";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Dashboard</Text>
      <Button
        title="Go to Sign Up"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
};

export default Home;
