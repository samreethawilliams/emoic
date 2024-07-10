import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import SignUp from "./SignUp";
import { useNavigation } from "@react-navigation/native";
import EmoicLogo from "./svgs/EmoicLogo";

const Login = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const navigation = useNavigation();

  return (
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
              placeholder="Enter your email address"
              placeholderTextColor={"#808080"}
              keyboardType="email-address"
              style={{
                width: "100%",
              }}
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
              placeholder="Enter your password"
              placeholderTextColor={"#808080"}
              secureTextEntry={isPasswordShown}
              style={{
                width: "100%",
              }}
            />

            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={{
                position: "absolute",
                right: 12,
              }}
            >
              {isPasswordShown == true ? (
                <Ionicons name="eye-off" size={24} color={"#808080"} />
              ) : (
                <Ionicons name="eye" size={24} color={"#808080"} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginTop: 18, marginBottom: 4 }}>
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
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
              Login
            </Text>
          </TouchableOpacity>
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
  );
};

export default Login;
