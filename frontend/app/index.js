import { View, Text, Button } from "react-native";
import Login from "./Login";
import SignUp from "./SignUp";
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const navigation = useNavigation();
  return (
    <View>
      <Text>Dashboard</Text>
      <Button
        title="Go to Sign Up"
        onPress={() => navigation.navigate('SignUp')}
      />
    </View>
  );
};

export default Home;
