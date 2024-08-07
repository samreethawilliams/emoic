import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Footer from "./components/footer";
import { TRANSCRIBE_SERVER, UPLOAD_SERVER } from "./utils/constants";
import { RootSiblingParent } from "react-native-root-siblings";
import Toast from "react-native-root-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AudioRecord = () => {
  const [recording, setRecording] = useState(null);
  const [recordingStatus, setRecordingStatus] = useState("idle");
  const [audioPermission, setAudioPermission] = useState(null);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(null);

  const navigation = useNavigation();

  const getUserData = async () => {
    const value = await AsyncStorage.getItem("user");
    setUser(JSON.parse(value));
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    async function getPermission() {
      const permission = await Audio.requestPermissionsAsync();
      console.log("Permission Granted: " + permission.granted);
      setAudioPermission(permission.granted);
    }

    getPermission();

    return () => {
      if (recording) {
        stopRecording();
      }
    };
  }, [recording]);

  async function startRecording() {
    try {
      if (audioPermission) {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
      }

      const newRecording = new Audio.Recording();
      console.log("Starting Recording");
      /* eslint-disable import/namespace */
      await newRecording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
      );
      await newRecording.startAsync();
      setRecording(newRecording);
      setRecordingStatus("recording");
    } catch (error) {
      console.error("Failed to start recording", error);
    }
  }

  async function stopRecording() {
    try {
      if (recordingStatus === "recording") {
        console.log("Stopping Recording");
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
        });
        await recording.stopAndUnloadAsync();
        const recordingUri = recording.getURI();
        const fileName = `recording-${Date.now()}.mp3`;

        await FileSystem.makeDirectoryAsync(
          FileSystem.documentDirectory + "recordings/",
          { intermediates: true },
        );
        const fileUri = FileSystem.documentDirectory + "recordings/" + fileName;

        console.log("Saved audio file to", fileUri);
        await FileSystem.moveAsync({
          from: recordingUri,
          to: fileUri,
        });

        const { sound } = await Audio.Sound.createAsync({ uri: fileUri });

        setRecordedAudio({
          sound,
          duration: getDurationFormatted(
            (await sound.getStatusAsync()).durationMillis,
          ),
          file: fileUri,
          fileName,
        });

        setRecording(null);
        setRecordingStatus("stopped");
      }
    } catch (error) {
      console.error("Failed to stop recording", error);
    }
  }

  function getDurationFormatted(milliseconds) {
    const minutes = Math.floor(milliseconds / 1000 / 60);
    const seconds = Math.round((milliseconds / 1000) % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  async function handleRecordButtonPress() {
    if (recording) {
      await stopRecording();
    } else {
      await startRecording();
    }
  }

  // api call
  async function uploadToServer() {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", {
        uri: recordedAudio.file,
        type: "audio/mp3",
        name: recordedAudio.fileName,
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
        await getTranscript(
          res.convertedAudioFile,
          res.originalAudioFile,
          recordedAudio.file,
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // api call
  async function getTranscript(
    audioNameToTranscribe,
    originalAudioFile,
    fileUri,
  ) {
    setLoading(true);
    console.log(audioNameToTranscribe);
    console.log(TRANSCRIBE_SERVER);
    try {
      const fetchCall = await fetch(`${TRANSCRIBE_SERVER}/transcribe`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          audioName: audioNameToTranscribe,
          originalAudioFile,
          userId: user.id,
          saveToHistory: true,
          fileUri,
        }),
      });
      const res = await fetchCall.json();
      console.log("response from /transcribe: ", res);

      if (
        res.message === "Some error occured" ||
        res.message === "Some database error occurred"
      ) {
        Toast.show(res.message + ". Please try again.", {
          duration: Toast.durations.SHORT,
        });
      }

      if (res.status === true) {
        navigation.navigate("Player", {
          audioName: recordedAudio.fileName,
          audioAuthor: user.name ?? "Unknown",
          fileUri: recordedAudio.file,
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

  return (
    <RootSiblingParent>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleRecordButtonPress}
        >
          <FontAwesome
            name={recording ? "stop-circle" : "circle"}
            size={64}
            color="white"
          />
        </TouchableOpacity>
        <Text style={styles.recordingStatusText}>
          {`Recording status: ${recordingStatus}`}
        </Text>

        {recordedAudio && (
          <View style={styles.row}>
            <Text style={styles.fill}>
              Recording | {recordedAudio.duration}
            </Text>
            <Button
              onPress={() => recordedAudio.sound.replayAsync()}
              title="Play"
            />
          </View>
        )}

        {recordingStatus === "stopped" && (
          <View style={{ marginTop: 20 }}>
            {loading ? (
              <ActivityIndicator size="small" color="#3E8B9A" />
            ) : (
              <TouchableOpacity
                onPress={() => uploadToServer()}
                style={styles.continueButton}
              >
                <Text style={styles.continueButtonText}>Analyze</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        <Footer />
      </View>
    </RootSiblingParent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#3E8B9A",
    borderWidth: 2,
    padding: 2,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: "red",
  },
  recordingStatusText: {
    marginTop: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    marginRight: 40,
  },
  fill: {
    flex: 1,
    margin: 15,
  },
  continueButton: {
    backgroundColor: "#3E8B9A",
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    width: 350,
    borderRadius: 8,
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AudioRecord;
