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
import Checkbox from "expo-checkbox";
import { useNavigation, CommonActions } from "@react-navigation/native";
import EmoicLogo from "./svgs/EmoicLogo";
import { RootSiblingParent } from "react-native-root-siblings";
import Toast from "react-native-root-toast";
import { UPLOAD_SERVER } from "./utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  // api call
  const signUp = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      Toast.show("Required fields missing", {
        duration: Toast.durations.SHORT,
      });
      setLoading(false);
      return;
    }

    // terms and conditions
    if (!isChecked) {
      Toast.show("You need to agree on our terms and conditions", {
        duration: Toast.durations.SHORT,
      });
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      Toast.show("Passwords don't match each other", {
        duration: Toast.durations.SHORT,
      });
      setLoading(false);
      return;
    }

    try {
      const fetchCall = await fetch(`${UPLOAD_SERVER}/sign-up`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      const res = await fetchCall.json();

      if (res.message === "Required sign up fields missing") {
        Toast.show(res.message, {
          duration: Toast.durations.SHORT,
        });
      }

      if (res.message === "User is already registered") {
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

      console.log("response from /sign-up: ", res);
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
          <View style={{ marginBottom: 20, alignItems: "center" }}>
            {/* <Image
            source={require("./emonic_logo.png")}
            style={{ width: 182, height: 180, marginBottom: 5 }}
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
              Name
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
                placeholder="Samreetha Williams"
                placeholderTextColor={"#808080"}
                keyboardType="name"
                style={{
                  width: "100%",
                }}
                onChangeText={(newText) => setName(newText)}
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
                placeholder="samreetha@email.com"
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

          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
              }}
            >
              Confirm Password
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
                secureTextEntry={!showConfirmPassword}
                style={{
                  width: "100%",
                }}
                onChangeText={(newText) => setConfirmPassword(newText)}
              />

              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  position: "absolute",
                  right: 12,
                }}
              >
                {showConfirmPassword === false ? (
                  <Ionicons name="eye" size={24} color={"#808080"} />
                ) : (
                  <Ionicons name="eye-off" size={24} color={"#808080"} />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginVertical: 6,
            }}
          >
            <Checkbox
              style={{ marginRight: 8 }}
              value={isChecked}
              onValueChange={setIsChecked}
              color={isChecked ? "#2f4f4f" : undefined}
            />
            <Text> I agree to the terms and conditions</Text>
          </View>

          <View style={{ marginTop: 18, marginBottom: 4 }}>
            {loading ? (
              <ActivityIndicator size="small" color="#3E8B9A" />
            ) : (
              <TouchableOpacity
                onPress={() => signUp()}
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
                  Sign Up
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </SafeAreaView>
    </RootSiblingParent>
  );
};

export default SignUp;
