import { View, TouchableOpacity, Modal, Text } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

const Footer = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const handleDashboardPress = () => {
    navigation.navigate("Dashboard");
  };

  const handleRecordAudioPress = () => {
    setModalVisible(false);
    navigation.navigate("AudioRecord");
  };

  const handleUploadAudioPress = () => {
    setModalVisible(false);
    navigation.navigate("UploadAudio");
  };
  const handleLogoutPress = () => {
    navigation.navigate("Login");
  };
  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#f8f8f8",
        padding: 20,
        borderTopWidth: 1,
        borderColor: "#ccc",
      }}
    >
      <TouchableOpacity onPress={handleDashboardPress}>
        <Ionicons name="home" size={30} color="#3E8B9A" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Ionicons name="add-circle" size={30} color="#3E8B9A" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogoutPress}>
        <Ionicons name="log-out" size={30} color="#3E8B9A" />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <TouchableOpacity
            style={{
              padding: 15,
              backgroundColor: "#3E8B9A",
              borderRadius: 10,
              marginBottom: 20,
              width: "80%",
              alignItems: "center",
            }}
            onPress={handleRecordAudioPress}
          >
            <Text style={{ color: "#fff", fontSize: 18 }}>Record Audio</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 15,
              backgroundColor: "#3E8B9A",
              borderRadius: 10,
              marginBottom: 20,
              width: "80%",
              alignItems: "center",
            }}
            onPress={handleUploadAudioPress}
          >
            <Text style={{ color: "#fff", fontSize: 18 }}>Upload Audio</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 15,
              backgroundColor: "red",
              borderRadius: 10,
              marginBottom: 20,
              width: "80%",
              alignItems: "center",
            }}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={{ color: "#fff", fontSize: 18 }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Footer;
