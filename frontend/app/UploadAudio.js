import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Ionicons } from "@expo/vector-icons";
import { TRANSCRIBE_SERVER, UPLOAD_SERVER } from "./utils/constants";
import { RootSiblingParent } from "react-native-root-siblings";
import Toast from "react-native-root-toast";
import { useNavigation } from "@react-navigation/native";

const UploadAudio = () => {
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  // api call
  async function getTranscript(fileUri, fileName, audioNameToTranscribe) {
    setLoading(true);
    try {
      const fetchCall = await fetch(
        `${TRANSCRIBE_SERVER}/transcribe?audioName=${audioNameToTranscribe}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );
      const res = await fetchCall.json();
      console.log("response from /transcribe: ", res);

      if (res.message === "Some error occured") {
        Toast.show(res.message + ". Please try again.", {
          duration: Toast.durations.SHORT,
        });
      }

      if (res.status === true) {
        navigation.navigate("Player", {
          audioName: fileName,
          audioAuthor: "Unknown",
          fileUri,
          transcript: res.transcript,
        });
      }

      // success
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // api call
  async function uploadToServer(fileUri, fileName) {
    const [fileNameFromUpload] = fileName.split(".mp3");
    const newFileName = `${fileNameFromUpload}-${Date.now()}.mp3`;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", {
        uri: fileUri,
        type: "audio/mp3",
        name: newFileName,
      });

      const fetchCall = await fetch(`${UPLOAD_SERVER}/upload-audio`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
      const res = await fetchCall.json();
      console.log("response from /upload-audio: ", res);

      if (res.message === "Some error occurred") {
        Toast.show(res.message + ". Please try again.", {
          duration: Toast.durations.SHORT,
        });
      }

      if (res.message === "Sucessfully uploaded and converted the files") {
        Toast.show(
          "Audio file has been uploaded and converted. Currently transcribing",
          {
            duration: Toast.durations.SHORT,
          },
        );
        await getTranscript(fileUri, fileName, res.convertedAudioFile);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleNavigateFiles() {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: "audio/*",
      });

      console.log("DocumentPicker Result:", res);

      if (!res.canceled) {
        if (res.assets[0].name.endsWith(".mp3")) {
          console.log(res.assets[0].uri);
          console.log(res.assets[0].name);

          await uploadToServer(res.assets[0].uri, res.assets[0].name);

          // make the api call to upload and transcribe
        } else {
          Alert.alert("Invalid File", "Please select only a .mp3 file.");
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <RootSiblingParent>
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
        {loading ? (
          <ActivityIndicator size="small" color="#3E8B9A" />
        ) : (
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
        )}
      </View>
    </RootSiblingParent>
  );
};

export default UploadAudio;
