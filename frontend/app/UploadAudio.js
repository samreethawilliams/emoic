import React from "react";
import { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Ionicons } from "@expo/vector-icons";

const UploadAudio = () => {
  const [fileUri, setFileUri] = useState(null);

  const handleNavigateFiles = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: "audio/",
      });

      console.log("DocumentPicker Result:", res);

      if (res.type === "success") {
        if (res.name.endsWith(".mp3")) {
          setFileUri(res.uri);
        } else {
          Alert.alert("Invalid File", "Please upload only a .mp3 file.");
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        borderColor: "#3E8B9A",
        borderWidth: 2,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f4f7",
      }}
    >
      <Text style={{ fontSize: 24, marginBottom: 20, color: "#3E8B9A" }}>
        Upload Audio
      </Text>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#3E8B9A",
          padding: 15,
          borderRadius: 5,
          marginBottom: 20,
        }}
        onPress={handleNavigateFiles}
      >
        <Ionicons name="folder-open" size={24} color="#fff" />
        <Text style={{ color: "#fff", fontSize: 18, marginLeft: 10 }}>
          Browse Files
        </Text>
      </TouchableOpacity>
      {fileUri && (
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 18, marginBottom: 10, color: "#3E8B9A" }}>
            {fileUri.split("/").pop()}
          </Text>
          <Text style={{ fontSize: 14, marginTop: 10, color: "#3E8B9A" }}>
            URI: {fileUri}
          </Text>
        </View>
      )}
    </View>
  );
};

export default UploadAudio;
