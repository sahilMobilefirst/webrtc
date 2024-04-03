import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import WebView from 'react-native-webview';
import RecordScreen from 'react-native-record-screen';
import RNFS from 'react-native-fs';

const WebviewPage = () => {
  const [data, setData] = useState("https://www.google.com/");
  const [link, setLink] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordedUrl, setRecordedUrl] = useState(null);

  const validateLink = async (link: string) => {
    try {
      const response = await fetch(link);
      if (response.ok) {
        setData(link);
      } else {
        Alert.alert('Invalid Link', 'The provided link is not valid.');
      }
    } catch (error) {
      Alert.alert('Invalid Link', 'The provided link is not valid.');
    }
  };

  const startRecording = async () => {
    try {
      await RecordScreen.startRecording();
      setIsRecording(true);
    } catch (error) {
      console.error(error);
    }
  };

  const stopRecording = async () => {
    try {
      const res = await RecordScreen.stopRecording();
      if (res) {
        // @ts-ignore
        const url = res.result.outputURL;
        setRecordedUrl(url);
        setIsRecording(false);

        // Save video to local storage
        const videoPath = `${RNFS.DownloadDirectoryPath}/recording.mp4`;
        await RNFS.copyFile(url, videoPath);
        console.log('Video saved to:', videoPath);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <View style={styles.container}>
      <WebView source={{ uri: data }} style={styles.webView} />
      <View style={styles.bottomCon}>
        <TextInput
          placeholder='Enter link here'
          style={styles.TextInput}
          onChangeText={(text) => {
            if (text.length === 0) {
              setData('https://www.google.com/');
            } else {
              setLink(text);
            }
          }}
        />
        <Pressable
          style={styles.btn}
          onPress={() => validateLink(link)}>
          <Text style={{ color: "white" }}>Enter</Text>
        </Pressable>
        {isRecording ? (
          <Pressable style={styles.recordBtn} onPress={stopRecording}>
            <Text style={{ color: 'white' }}>Stop Recording</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.recordBtn} onPress={startRecording}>
            <Text style={{ color: 'white' }}>Start Recording</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default WebviewPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  TextInput: {
    backgroundColor: "gray",
    color: "black",
    width: "50%",
    height: 40,
    borderRadius: 5,
  },
  webView: {
    flex: 1,
    backgroundColor: "gray",
  },
  btn: {
    backgroundColor: "#3498DB",
    borderRadius: 5,
    padding: 8,
    height: 40,
  },
  bottomCon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingBottom: 20,
  },
  recordBtn: {
    backgroundColor: '#3498DB',
    borderRadius: 5,
    padding: 8,
    height: 40,
  },
});
