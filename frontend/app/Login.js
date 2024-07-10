import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, CommonActions } from "@react-navigation/native";
import EmoicLogo from "./svgs/EmoicLogo";
import { UPLOAD_SERVER } from "./utils/constants";
import { RootSiblingParent } from "react-native-root-siblings";
import Toast from "react-native-root-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();

  // api call
  const login = async () => {
    setLoading(true);
    try {
      const fetchCall = await fetch(`${UPLOAD_SERVER}/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const res = await fetchCall.json();

      if (res.message === "Required login fields missing") {
        Toast.show(res.message, {
          duration: Toast.durations.SHORT,
        });
      }

      if (res.message === "User does not exist") {
        Toast.show(res.message, {
          duration: Toast.durations.SHORT,
        });
      }

      if (res.message === "Invalid credentials") {
        Toast.show(res.message, {
          duration: Toast.durations.SHORT,
        });
      }

      if (res.message === "Some error occurred") {
        Toast.show(res.message, {
          duration: Toast.durations.SHORT,
        });
      }

      if (res.status) {
        try {
          await AsyncStorage.setItem("user", JSON.stringify(res.user));
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Dashboard" }],
            }),
          );
        } catch (e) {
          console.log(e);
        }
      }

      console.log("response from /login: ", res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
<RootSiblingParent>
    <SafeAreaView
      style={{ flex: 1, borderColor: "#3E8B9A", borderWidth: 2, padding: 2 }}
    >
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <View style={{ marginBottom: 100, alignItems: "center" }}>
          {/* <Image
            source={require("./assets/images/background.png")}
            style={{ width: 282, height: 280, marginBottom: 16 }}
          /> */}
            <EmoicLogo style={{ width: 160, height: 160 }} />
          </View>

          <View style={{ marginBottom: 12, marginTop: -35 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
              }}
            >
              Email address
            </Text>

            <View
              style={{
                width: "100%",
                height: 48,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
              }}
            >
              <TextInput
                placeholder="me@me.com"
                placeholderTextColor={"#808080"}
                keyboardType="email-address"
                style={{
                  width: "100%",
                }}
                onChangeText={(newText) => setEmail(newText)}
              />
            </View>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
              }}
            >
              Password
            </Text>

            <View
              style={{
                width: "100%",
                height: 48,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
              }}
            >
              <TextInput
                placeholder="********"
                placeholderTextColor={"#808080"}
                secureTextEntry={!showPassword}
                style={{
                  width: "100%",
                }}
                onChangeText={(newText) => setPassword(newText)}
              />

              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: 12,
                }}
              >
                {showPassword === false ? (
                  <Ionicons name="eye" size={24} color={"#808080"} />
                ) : (
                  <Ionicons name="eye-off" size={24} color={"#808080"} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginTop: 18, marginBottom: 4 }}>
            {loading ? (
              <ActivityIndicator size="small" color="#3E8B9A" />
            ) : (
              <TouchableOpacity
                onPress={() => login()}
                style={{
                  backgroundColor: "#3E8B9A",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 48,
                  borderRadius: 8,
                }}
              >
                <Text
                  style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}
                >
                  Login
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <View
            style={{
              marginTop: 16,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text>
              Don't have an account?{" "}
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text style={{ color: "blue", marginVertical: -3 }}>
                  {" "}
                  Sign Up
                </Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </RootSiblingParent>
  );
};

export default Login;
